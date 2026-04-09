package handler

import (
	"linksort/internal/helper"
	"linksort/internal/middleware"
	"linksort/internal/models"
	"linksort/internal/service"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	AuthService *service.AuthService
}

func NewAuthHandler(repo *service.AuthService) *AuthHandler {
	return &AuthHandler{
		AuthService: repo,
	}
}

type ResponseUser struct {
	Id         int       `json:"id"`
	Email      string    `json:"email"`
	Created_at time.Time `json:"created_at"`
}

// Register godoc
// @Summary Register a new user
// @Description Register a new user with email and password
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body models.Register true "Register request body"
// @Success 200 {object} map[string]interface{} "Success register"
// @Failure 400 {object} map[string]interface{} "Invalid request or Email already exists"
// @Failure 500 {object} map[string]interface{} "Failed register"
// @Router /api/register [post]
func (h *AuthHandler) Register(ctx *gin.Context) {

	var req models.Register

	if err := ctx.ShouldBindJSON(&req); err != nil {
		helper.ResponseErr(ctx, http.StatusBadRequest, "Invalid request body ", nil, err)
		return
	}

	err := h.AuthService.Register(ctx, &req)
	if err != nil {
		if strings.Contains(err.Error(), "duplicate key") {
			helper.ResponseErr(ctx, http.StatusBadRequest, "Email already exists ", nil, err)
			return
		}
		helper.ResponseErr(ctx, http.StatusInternalServerError, "Failed register ", nil, err)
		return
	}

	helper.ResponseOk(ctx, http.StatusOK, "Success register", nil)
}

// Login godoc
// @Summary Login user
// @Description Login to get a JWT token
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body models.Register true "Login request body"
// @Success 200 {object} map[string]interface{} "Success Login"
// @Failure 400 {object} map[string]interface{} "Invalid request or Wrong Email/Password"
// @Router /api/login [post]
func (h *AuthHandler) Login(ctx *gin.Context) {
	var req models.Register

	if err := ctx.ShouldBindJSON(&req); err != nil {
		helper.ResponseErr(ctx, http.StatusBadRequest, "Invalid request", nil, err)
		return
	}

	user, err := h.AuthService.Login(req.Email, req.Password)
	if err != nil {
		helper.ResponseErr(ctx, http.StatusBadRequest, "Wrong Email or Password", nil, err)
		return
	}

	token, err := middleware.GenerateToken(user.Id, user.Email, user.Createdat)
	if err != nil {
		helper.ResponseErr(ctx, http.StatusInternalServerError, "Failed generate token", nil, err)
		return
	}

	ctx.SetSameSite(http.SameSiteLaxMode)

	ctx.SetCookie("token", token, 3600, "/", "", false, true)

	result := gin.H{
		"token": token,
		"user": ResponseUser{
			Id:         user.Id,
			Email:      user.Email,
			Created_at: user.Createdat,
		},
	}

	helper.ResponseOk(ctx, http.StatusOK, "Success Login", result)
}

func (h *AuthHandler) Me(ctx *gin.Context) {
	tokenString, err := ctx.Cookie("token")
	if err != nil {
		ctx.JSON(401, gin.H{"message": "Unauthorized"})
		return
	}

	claims, err := middleware.ParseToken(tokenString)
	if err != nil {
		ctx.JSON(401, gin.H{"message": "Invalid token"})
		return
	}

	ctx.JSON(200, gin.H{
		"user": gin.H{
			"id":    claims.UserID,
			"email": claims.Email,
		},
	})
}
