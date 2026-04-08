# Full Stack

## Description

This Repo is fullstack project link sortered build with React JS, Golang and Postgresql

## How to use

To run this project you should clone this repo and run backend and front end project

run this

```bash

git clone https://github.com/AbiPasundan/sortlink.git

cd sortlink/frontend

npm install

npm run dev

cd ../backend

go mod tidy

go run cmd/main.go

```

after run frontend project will run in port 5173 and backend will run in port 8888

for detail information you can see README of [Backend](backend/README.md) and [Frontend](frontend/README.md)

## Using Docker

If you have docker you can run this project by run this command

```bash

cd frontend

docker build -t frontend-sortlink .

docker run -d -p 8080:80 --name frontend-container frontend-sortlink

cd ../backend

docker build -t backend-sortlink .

docker network create app-network

docker run -d --name postgres-db --network app-network -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=app_db -p 5432:5432 postgres:16-alpine

docker run -d -p 8888:80 --name backend-container backend-sortlink

```

## Feature

The main feature of this project

- Auth (Login/Register)
- Responsive Design
- CRUD link sorted

## Demo

![Demo](frontend/public/demo.webm)
