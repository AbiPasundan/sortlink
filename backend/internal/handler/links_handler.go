package handler

import (
	"linksort/internal/helper"
	"linksort/internal/models"
	"linksort/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type LinksHandler struct {
	LinkService *service.LinksService
}

func NewLinksHandler(service *service.LinksService) *LinksHandler {
	return &LinksHandler{
		LinkService: service,
	}
}

func (h *LinksHandler) CreateLink(ctx *gin.Context) {
	var newProducts models.CreateLinks

	if err := ctx.ShouldBindJSON(&newProducts); err != nil {
		helper.ResponseErr(ctx, http.StatusBadRequest, "Invalid request body ", nil, err)
		return
	}
	err := h.LinkService.CreateLinkService(newProducts)
	if err != nil {
		helper.ResponseErr(ctx, http.StatusInternalServerError, "Internal Server Error ", nil, err)
		return
	}

	helper.ResponseOk(ctx, http.StatusOK, "Success Create Link ", nil)
}
