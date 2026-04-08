FROM golang:1.25.3-alpine AS build

WORKDIR /workspace

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o backend cmd/main.go

FROM alpine:latest

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=build --chown=appuser:appgroup /workspace/backend .
COPY --chown=appuser:appgroup .env .

USER appuser

EXPOSE 8888 

ENTRYPOINT ["./backend"]