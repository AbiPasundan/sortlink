package dto

import "time"

// id user_id original_url slug created_at deleted_at
type Links struct {
	ID          int        `json:"id" db:"id"`
	UserID      int        `json:"user_id" db:"user_id"`
	OriginalURL string     `json:"original_url" db:"original_url" binding:"required,url"`
	Slug        string     `json:"slug" db:"slug"`
	CreatedAt   time.Time  `json:"created_at" db:"created_at"`
	DeletedAt   *time.Time `json:"deleted_at" db:"deleted_at"`
}
