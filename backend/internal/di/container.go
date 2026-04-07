package di

import (
	"context"
	"linksort/internal/handler"
	"linksort/internal/repository"
	"linksort/internal/service"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

type Container struct {
	Pool        *pgxpool.Pool
	AuthHandler *handler.AuthHandler
}

func BuildContainer() *Container {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		databaseURL = "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable"
	}
	config, err := pgxpool.ParseConfig(databaseURL)
	if err != nil {
		log.Fatalf("Gagal parse config: %v", err)
	}

	config.MaxConns = 10

	pool, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		log.Fatalf("Gagal membuat connection pool: %v", err)
	}

	if err := pool.Ping(context.Background()); err != nil {
		log.Fatalf("Database tidak merespon: %v", err)
	}
	log.Println("Berhasil terhubung menggunakan connection pool!")

	authRepo := repository.NewAuthRepository(pool)
	authService := service.NewAuthService(authRepo)
	authHandler := handler.NewAuthHandler(authService)

	return &Container{
		AuthHandler: authHandler,
	}

}
