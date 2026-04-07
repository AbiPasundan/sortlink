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

func (h *AuthHandler) Register(ctx *gin.Context) {

	var req models.Register

	if err := ctx.ShouldBindJSON(&req); err != nil {
		helper.ResponseErr(ctx, http.StatusBadRequest, "Invalid request body ", nil, err)
		return
	}

	err := h.AuthService.Register(&req)
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

func (h *AuthHandler) Login(ctx *gin.Context) {
	var req models.Register

	if err := ctx.ShouldBindJSON(&req); err != nil {
		helper.ResponseErr(ctx, http.StatusBadRequest, "Invalid request ", nil, err)
		return
	}

	user, err := h.AuthService.Login(req.Email, req.Password)

	if err != nil {
		helper.ResponseErr(ctx, http.StatusBadRequest, "Wrong Email or Password ", nil, err)
		return
	}

	token, err := middleware.GenerateToken(user.Id, user.Email, user.Createdat)

	result := gin.H{
		"token": token,
		"user": ResponseUser{
			Id:         user.Id,
			Email:      user.Email,
			Created_at: user.Createdat,
		},
	}

	helper.ResponseOk(ctx, http.StatusOK, "Success Login ", result)

}
