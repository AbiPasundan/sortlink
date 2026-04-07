package handler

import (
	"fmt"
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

func (h *LinksHandler) GetLinkHandler(ctx *gin.Context) {
	id, exists := ctx.Get("id")
	fmt.Println("teuing naon ieulah", exists)
	fmt.Println("id from header ", id)

	if !exists {
		helper.ResponseErr(ctx, http.StatusUnauthorized, "Unauthorized", exists, nil)
		return
	}

	links, err := h.LinkService.GetLinkService(id.(int))

	if err != nil {
		helper.ResponseErr(ctx, http.StatusInternalServerError, "Failed to get links ", err.Error(), err)
		return
	}
	helper.ResponseOk(ctx, http.StatusOK, "Success get All Links ", links)
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
