package handler

import (
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
		ctx.JSON(http.StatusBadRequest, gin.H{
			"success": true,
			"message": "Invalid request body",
			"results": nil,
		})
		return
	}

	err := h.AuthService.Register(&req)
	if err != nil {
		if strings.Contains(err.Error(), "duplicate key") {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"success": true,
				"message": "Email already exists",
				"results": nil,
			})
			return
		}
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"success": true,
			"message": "Failed register" + err.Error(),
			"results": nil,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Success Create User",
		"results": nil,
	})
}
