package repository

import (
	"context"
	"linksort/internal/dto"
	"linksort/internal/models"

	"github.com/jackc/pgx/v5/pgxpool"
)

type AuthRepository struct {
	db *pgxpool.Pool
}

func NewAuthRepository(db *pgxpool.Pool) *AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) FindEmail(email string) (*dto.Users, error) {
	row := r.db.QueryRow(context.Background(), `
		SELECT id, email, password created_at FROM users WHERE email = $1;
	`, email)

	var user dto.Users
	err := row.Scan(&user.Id, &user.Email, &user.Password, &user.Createdat)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *AuthRepository) Register(user *models.Register) error {
	_, err := u.db.Exec(context.Background(), `
		INSERT INTO users (email, password )
		VALUES ($1, $2 )
	`, user.Email, user.Password, 2)

	return err
}
