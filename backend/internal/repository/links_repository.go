package repository

import (
	"context"
	"linksort/internal/dto"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type LinksRepository struct {
	db *pgxpool.Pool
}

func NewLinksRepository(db *pgxpool.Pool) *LinksRepository {
	return &LinksRepository{db: db}
}

func (p *LinksRepository) CreateLink(link dto.Links) (dto.Links, error) {
	query := `INSERT INTO links (user_id, original_url, slug, created_at) VALUES ($1, $2, $3, NOW()) RETURNING original_url, slug, created_at`
	rows, err := p.db.Query(context.Background(), query, link.UserID, link.OriginalURL, link.Slug)
	if err != nil {
		return dto.Links{}, err
	}

	defer rows.Close()

	return pgx.CollectOneRow(rows, pgx.RowToStructByName[dto.Links])
}
