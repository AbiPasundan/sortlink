package models

import "time"

type CreateLinks struct {
	UserID      int       `json:"user_id" db:"user_id"`
	OriginalURL string    `json:"original_url" db:"original_url" binding:"required,url"`
	Slug        string    `json:"slug" db:"slug" binding:"omitempty,alphanum"`
	CreatedAt   time.Time `json:"created_at" db:"created_at" swaggerignore:"true"`
}

type GetLinks struct {
	UserID      int       `json:"user_id" db:"id"`
	OriginalURL string    `json:"original_url" db:"original_url" binding:"required,url"`
	Slug        string    `json:"slug" db:"slug"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}
