package routes

import (
	"linksort/internal/handler"
	"linksort/internal/middleware"

	"github.com/gin-gonic/gin"
)

func LinksRoutes(r *gin.Engine, h *handler.LinksHandler) {
	r.GET("/:slug", h.Redirect)
	admin := r.Group("/api")
	admin.Use(middleware.JWTMiddleware())
	admin.POST("/links", h.CreateLink)
	admin.GET("/links", h.GetLinkHandler)
	admin.PATCH("/links/:id", h.DeleteLink)
}
