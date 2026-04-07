package repository

import (
	"context"
	"linksort/internal/models"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type LinksRepository struct {
	db *pgxpool.Pool
}

func NewLinksRepository(db *pgxpool.Pool) *LinksRepository {
	return &LinksRepository{db: db}
}

func (p *LinksRepository) CreateLink(link models.CreateLinks) error {
	query := `INSERT INTO links (user_id, original_url, slug, created_at, deleted_at) VALUES ($1, $2, $3, NOW(), NULL);`
	_, err := p.db.Exec(context.Background(), query, link.UserID, link.OriginalURL, link.Slug)
	if err != nil {
		return err
	}

	return err
}

func (p *LinksRepository) GetLinks(id int) ([]models.GetLinks, error) {

	rows, err := p.db.Query(context.Background(), `
		SELECT u.id, l.original_url, l.slug, l.created_at FROM users u LEFT JOIN links l ON u.id = l.user_id WHERE u.id = $1 AND l.deleted_at IS NULL;
	`, id)

	products, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.GetLinks])

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	return products, nil
}

func (p *LinksRepository) DeleteLink(userId int, id int) error {
	query := `UPDATE links SET deleted_at = NOW() WHERE links.user_id = $1 AND links.id = $2;`
	_, err := p.db.Exec(context.Background(), query, userId, id)
	if err != nil {
		return err
	}

	return err
}
