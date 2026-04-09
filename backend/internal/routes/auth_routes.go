package routes

import (
	"linksort/internal/handler"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine, h *handler.AuthHandler) {
	routes := r.Group("/api")
	routes.POST("/register", h.Register)
	routes.POST("/login", h.Login)
	routes.GET("/me", h.Me)
}
