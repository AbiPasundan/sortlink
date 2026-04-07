package repository

import (
	"context"
	"linksort/internal/dto"
	"linksort/internal/models"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AuthRepository struct {
	db *pgxpool.Pool
}

func NewAuthRepository(db *pgxpool.Pool) *AuthRepository {
	return &AuthRepository{db: db}
}

func (f *AuthRepository) FindEmail(email string) (*dto.Users, error) {
	query := `SELECT id, email, password, created_at FROM users WHERE email = $1`
	rows, err := f.db.Query(context.Background(), query, email)
	if err != nil {
		return nil, err
	}
	user, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[dto.Users])
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (u *AuthRepository) Register(user *models.Register) error {
	_, err := u.db.Exec(context.Background(), `
		INSERT INTO users (email, password, created_at )
		VALUES ($1, $2, NOW())
	`, user.Email, user.Password)

	return err
}
