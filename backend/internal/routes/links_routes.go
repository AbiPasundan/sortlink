package routes

import (
	"linksort/internal/handler"

	"github.com/gin-gonic/gin"
)

func LinksRoutes(r *gin.Engine, h *handler.LinksHandler) {
	r.POST("/api/links", h.CreateLink)
}
