package helper

import (
	"errors"

	"github.com/go-playground/validator/v10"
)

func FormatValidationError(err error) []string {
	var ve validator.ValidationErrors

	if errors.As(err, &ve) {
		out := make([]string, len(ve))
		for i, fe := range ve {
			switch fe.Field() {
			case "OriginalURL":
				switch fe.Tag() {
				case "required":
					out[i] = "Original URL cannot be empty should contains http/https."
				case "url":
				}
			case "Slug":
				if fe.Tag() == "alphanum" {
					out[i] = "Slugs can only contain a combination of letters and numbers (no spaces or symbols)."
				}
			default:
				out[i] = "Field " + fe.Field() + " tidak valid."
			}
		}
		return out
	}

	return []string{"Invalid request body."}
}
