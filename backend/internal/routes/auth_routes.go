package routes

import (
	"linksort/internal/handler"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine, h *handler.AuthHandler) {
	r.POST("/register", h.Register)
}
