# Backend

## Description

This project is restfull api for application link sorted the major tech stack that use in this project are gin gonic framework, air (for development), docker for containerize, postgresql (using pgx) to connect to db

## Project Structure

```markdown

- README.md
- backend
  - .air.toml
  - .env
  - .github
    - workflow
      - build.yaml
  - .gitignore
  - Dockerfile
  - README.md
  - cmd
    - docs
      - docs.go
      - swagger.json
      - swagger.yaml
    - main.go
  - go.mod
  - go.sum
  - internal
    - di
      - container.go
    - dto
      - links_dto.go
      - users_dto.go
    - handler
      - auth_handler.go
      - links_handler.go
    - helper
      - response_helper.go
      - validate_req_helper.go
    - middleware
      - auth_middleware.go
      - cors_middleware.go
    - models
      - auth_models.go
      - links_models.go
    - repository
      - auth_repo.go
      - links_repository.go
    - routes
      - auth_routes.go
      - links_routes.go
    - service
      - auth_service.go
      - links_service.go
  - tmp
    - build-errors.log
    - main

```

## Feature

This project has main feature

- Auth Login and Register (using jwt)
- CRUD link sort
- API docs

## How to Run

To run this project clone this repo open terminal in folder backend and run command `go mod tidy`, change file `.env.example` to `.env` you can setting up your .env after that run `go run cmd/main.go`

```bash
git clone https://github.com/AbiPasundan/sortlink.git

cd sortlink/backend

go mod tidy

go run cmd/main.go
```

## Demo

After run this project you can see the demo in browser `http://localhost:yourport/docs`
