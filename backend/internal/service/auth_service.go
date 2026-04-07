package service

import (
	"fmt"
	"linksort/internal/dto"
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

func (s *AuthService) Login(email, password string) (*dto.Users, error) {
	// argon := argon2.DefaultConfig()

	user, err := s.AuthRepo.FindEmail(email)
	if err != nil {
		return nil, err
	}

	match, err := argon2.VerifyEncoded([]byte(password), []byte(user.Password))
	if err != nil {
		return nil, fmt.Errorf("error verifying password: %w", err)
	}

	if !match {
		return nil, fmt.Errorf("invalid credentials")
	}

	return user, nil
}
