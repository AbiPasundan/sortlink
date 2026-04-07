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

func (r *AuthRepository) Register(ctx context.Context, user *models.Register) error {
	tx, err := r.db.Begin(ctx)
	if err != nil {
		return err
	}

	defer tx.Rollback(ctx)

	var userID int
	queryRegister := `INSERT INTO users (email, password, created_at)  VALUES ($1, $2, NOW())  RETURNING id`

	err = tx.QueryRow(ctx, queryRegister, user.Email, user.Password).Scan(&userID)
	if err != nil {
		return err
	}

	queryInsertLink := ` INSERT INTO links (user_id, original_url, slug, created_at, deleted_at)  VALUES ($1, 'https://www.google.com', substring(md5(random()::text) from 1 for 8), NOW(), NULL)`

	_, err = tx.Exec(ctx, queryInsertLink, userID)
	if err != nil {
		return err
	}

	if err := tx.Commit(ctx); err != nil {
		return err
	}

	return nil
}
