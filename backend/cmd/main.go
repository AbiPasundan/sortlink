package main

import (
	"fmt"
	"linksort/internal/di"
	"linksort/internal/middleware"
	"linksort/internal/routes"
	"os"

	_ "linksort/docs"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Short Link API
// @version 1.0
// @description API for managing short links
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and your JWT token.
func main() {
	godotenv.Load()
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	userContainer := di.BuildContainer()
	defer userContainer.Pool.Close()

	routes.AuthRoutes(r, userContainer.AuthHandler)
	routes.LinksRoutes(r, userContainer.LinksHandler)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))
}
