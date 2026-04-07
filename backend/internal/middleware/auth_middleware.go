package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	UserID int    `db:"user_id" json:"user_id"`
	Email  string `db:"email" json:"email"`
	jwt.RegisteredClaims
}

var secretKey = fmt.Appendf(nil, ":%s", os.Getenv("SECRET_KEY"))

func JWTMiddleware() gin.HandlerFunc {
	if secretKey == nil {
		secretKey = []byte("SECRET_KEY")
	}
	return func(c *gin.Context) {

		auth := c.GetHeader("Authorization")

		if auth == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}

		parts := strings.Split(auth, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token format"})
			return
		}

		tokenStr := strings.Trim(parts[1], "\"' ")

		claims := &Claims{}

		token, err := jwt.ParseWithClaims(tokenStr, claims,
			func(token *jwt.Token) (any, error) {
				return secretKey, nil
			})

		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token", "details": err.Error()})
			return
		}

		if !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "token is not valid"})
			return
		}

		c.Next()
	}
}

func GenerateToken(userID int, email string, created_at time.Time) (string, error) {

	expiration := time.Now().Add(time.Hour * 24)

	claims := &Claims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiration),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(secretKey)
}
