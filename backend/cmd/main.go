package main

import (
	"fmt"
	"linksort/internal/di"
	"linksort/internal/middleware"
	"linksort/internal/routes"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

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
