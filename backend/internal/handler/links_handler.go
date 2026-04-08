package handler

import (
	"fmt"
	_ "linksort/internal/dto"
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

// GetAllShortLinks godoc
// @Summary Get all short links
// @Description Get all short links for the authenticated user
// @Tags Links
// @Security BearerAuth
// @Produce json
// @Param id header int true "Authenticated User ID"
// @Success 200 {array} dto.Links "Links fetched successfully"
// @Failure 401 {object} map[string]interface{} "Unauthorized"
// @Failure 500 {object} map[string]interface{} "Internal server error"
// @Router /api/links [get]
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

// CreateLink godoc
// @Summary Create a new short link
// @Description Create a new short link for the authenticated user
// @Tags Links
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body models.CreateLinks true "Create link request body"
// @Success 200 {object} map[string]interface{} "Link created successfully"
// @Failure 400 {object} map[string]interface{} "Validation failed"
// @Failure 500 {object} map[string]interface{} "Internal server error"
// @Router /api/links [post]
func (h *LinksHandler) CreateLink(ctx *gin.Context) {
	var newLink models.CreateLinks

	if err := ctx.ShouldBindJSON(&newLink); err != nil {
		errMessage := helper.FormatValidationError(err)
		helper.ResponseErr(ctx, http.StatusBadRequest, "Validation failed ", errMessage, err)
		return
	}

	err := h.LinkService.CreateLinkService(newLink)
	if err != nil {
		helper.ResponseErr(ctx, http.StatusInternalServerError, "Gagal membuat link", nil, err)
		return
	}

	helper.ResponseOk(ctx, http.StatusOK, "Berhasil membuat link", nil)
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
