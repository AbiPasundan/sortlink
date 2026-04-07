package models

type Register struct {
	Email    string `json:"email" db:"email" binding:"required,email"`
	Password string `json:"-" db:"password" binding:"required,min=8"`
}
