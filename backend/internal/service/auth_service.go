package service

import (
	"linksort/internal/models"
	"linksort/internal/repository"

	"github.com/matthewhartstonge/argon2"
)

type AuthService struct {
	AuthRepo *repository.AuthRepository
}

func NewAuthService(repo *repository.AuthRepository) *AuthService {
	return &AuthService{
		AuthRepo: repo,
	}
}

func (s *AuthService) Register(user *models.Register) error {
	argon := argon2.DefaultConfig()

	encoded, err := argon.HashEncoded([]byte(user.Password))

	if err != nil {
		return err
	}

	user.Password = string(encoded)

	return s.AuthRepo.Register(user)
}
