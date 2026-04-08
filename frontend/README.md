# Frontend

## Description

This Folder is frontend web application for link sortered using major tech stack react js, tailwindcss, redux tool kit, react icons

## Feature

The main feature of this project

- Auth (Login/Register)
- Responsive Design
- CRUD link sorted

## Project Strutcture

```markdown
- frontend
  - .dockerignore
  - .github
    - workflow
      - build.yaml
  - .gitignore
  - Dockerfile
  - README.md
  - default.conf
  - eslint.config.js
  - index.html
  - package-lock.json
  - package.json
  - public
    - favicon.svg
    - icons.svg
  - src
    - app
      - store.js
    - assets
      - hero.png
      - img
        - datainsight.png
        - logo.png
      - react.svg
      - vite.svg
    - components
      - Footer.jsx
      - Navbar.jsx
      - auth
        - InputField.jsx
        - LayoutAuth.jsx
      - dashboard
        - Card.jsx
        - DashboardHeader.jsx
        - DashboardLayout.jsx
        - DashboardMain.jsx
        - DashboardPagination.jsx
        - DataInsight.jsx
        - Hero.jsx
      - profile
    - feature
      - api.js
    - index.css
    - main.jsx
    - pages
      - Dashboard.jsx
      - LandingPage.jsx
      - Login.jsx
      - NotFound.jsx
      - Register.jsx
      - SortLink.jsx
  - vite.config.js

```

## How to Run

To run this project clone this repo. After that open terminal in folder frontend and run command `npm install` and `npm run dev` this will run in `http://localhost:5173`

```bash
git clone https://github.com/AbiPasundan/sortlink.git

cd sortlink/frontend

npm install

npm run dev
```

## Demo

![Demo](public/demo.webm)
