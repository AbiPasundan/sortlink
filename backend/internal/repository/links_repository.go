package repository

import (
	"context"
	"linksort/internal/models"

	"github.com/jackc/pgx/v5/pgxpool"
)

type LinksRepository struct {
	db *pgxpool.Pool
}

func NewLinksRepository(db *pgxpool.Pool) *LinksRepository {
	return &LinksRepository{db: db}
}

func (p *LinksRepository) CreateLink(link models.CreateLinks) error {
	query := `INSERT INTO links (user_id, original_url, slug, created_at) VALUES ($1, $2, $3, NOW())`
	_, err := p.db.Exec(context.Background(), query, link.UserID, link.OriginalURL, link.Slug)
	if err != nil {
		return err
	}

	return err
}
