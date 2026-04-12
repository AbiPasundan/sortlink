package middleware

import (
	"errors"
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
	return func(ctx *gin.Context) {

		var tokenStr string

		cookieToken, err := ctx.Cookie("token")
		if err == nil && cookieToken != "" {
			tokenStr = cookieToken
		} else {
			auth := ctx.GetHeader("Authorization")

			if auth == "" {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
				return
			}

			parts := strings.Split(auth, " ")
			if len(parts) != 2 || parts[0] != "Bearer" {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token format"})
				return
			}

			tokenStr = strings.Trim(parts[1], "\"' ")
		}

		claims := &Claims{}

		token, err := jwt.ParseWithClaims(tokenStr, claims,
			func(token *jwt.Token) (any, error) {
				return secretKey, nil
			})

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token", "details": err.Error()})
			return
		}

		if !token.Valid {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "token is not valid"})
			return
		}

		ctx.Set("id", claims.UserID)

		ctx.Next()
	}
}

func GenerateToken(userID int, email string, created_at time.Time) (string, error) {

	expiration := time.Now().Add(time.Minute * 24)

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

func ParseToken(tokenString string) (*Claims, error) {
	if secretKey == nil {
		secretKey = []byte("SECRET_KEY")
	}

	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (any, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(secretKey), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
