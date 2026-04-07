package dto

import "time"

type Users struct {
	Id        int       `json:"id" db:"id"`
	Email     string    `json:"email" db:"email" binding:"required,email"`
	Password  string    `json:"-" db:"password" binding:"required,min=8"`
	Createdat time.Time `json:"created_at" db:"created_at"`
}
