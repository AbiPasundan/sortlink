package handler

import (
	"linksort/internal/helper"
	"linksort/internal/models"
	"linksort/internal/service"
	"net/http"
	"strings"

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
