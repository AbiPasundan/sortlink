package handler

import (
	"fmt"
	"linksort/internal/helper"
	"linksort/internal/models"
	"linksort/internal/service"
	"net/http"
	"strconv"

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

func (h *LinksHandler) DeleteLink(ctx *gin.Context) {

	idParamsRaw := ctx.Param("id")
	idParams, err := strconv.Atoi(idParamsRaw)
	if helper.ResponseErr(ctx, http.StatusBadRequest, "Invalid ID format: ", nil, err) {
		return
	}
	fmt.Println("link id", idParams)

	userIdRaw, exists := ctx.Get("id")
	userId := userIdRaw.(int)
	if !exists {
		helper.ResponseErr(ctx, http.StatusUnauthorized, "Unauthorized", exists, nil)
		return
	}

	h.LinkService.DeleteLinkService(userId, idParams)
	helper.ResponseErr(ctx, http.StatusNotFound, "id not found", nil, err)

	helper.ResponseOk(ctx, http.StatusOK, fmt.Sprintf("Success delete category with id: %d", idParams), nil)
}
