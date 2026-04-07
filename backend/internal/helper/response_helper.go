package helper

import (
	"github.com/gin-gonic/gin"
)

type Response struct {
	Success bool
	Message string
	Results any
}

func ResponseErr(ctx *gin.Context, responseStatus int, message string, result any, err error) bool {
	if err != nil {
		ctx.JSON(responseStatus, Response{
			Success: false,
			Message: message + err.Error(),
			Results: result,
		})
		return true
	}
	return false
}

func ResponseOk(ctx *gin.Context, responseStatus int, message string, result any) {
	ctx.JSON(responseStatus, Response{
		Success: true,
		Message: message,
		Results: result,
	})
}
