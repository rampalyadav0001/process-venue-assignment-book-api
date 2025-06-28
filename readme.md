
# 📚 Book Review API

A RESTful Book Review service built using **TypeScript + Express**, with **PostgreSQL**, **TypeORM**, **Redis** cache, **Docker**, **Swagger**, and **Jest** testing support.

---

## 🔧 Features

- List all books (`GET /books`)
- Add a new book (`POST /books`)
- Get reviews for a book (`GET /books/:id/reviews`)
- Add review to a book (`POST /books/:id/reviews`)
- Redis cache for `/books` with fallback
- Swagger (OpenAPI) docs at `/api-docs`
- Automated tests using Jest + Supertest
- PostgreSQL + TypeORM (with index on `reviews.bookId`)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone <repo-url>
cd book-review-api
```

### 2. Start with Docker

```bash
docker-compose up --build
```

### 3. Access the API

- API Base: `http://localhost:3000`
- Swagger Docs: `http://localhost:3000/api-docs`

---

## 🧪 Running Tests

```bash
# Unit + Integration Tests
npm run test
```

---

## 📁 Project Structure

```
book-review-api/
│
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env
├── README.md
│
├── src/
│
│   ├── index.ts               # Main server bootstrap file
│
│   ├── config/
│   │   ├── data-source.ts     # TypeORM DataSource config
│   │   └── redis.ts           # Redis client setup
│
│   ├── controllers/
│   │   └── book.controller.ts # Route handlers (with async logic)
│
│   ├── services/
│   │   └── book.service.ts    # Business logic for DB + Redis
│
│   ├── models/
│   │   ├── Book.ts            # Book entity
│   │   └── Review.ts          # Review entity
│
│   ├── routes/
│   │   └── book.routes.ts     # Express routes for book/review
│
│   ├── docs/
│   │   └── swagger.ts         # Swagger specification config
│
│   └── middleware/
│       └── error.middleware.ts  # (Optional) Custom error handling
│
├── tests/
│   ├── unit/
│   │   └── book.controller.test.ts     # Unit tests for controller
│   └── integration/
│       └── books.integration.test.ts   # Integration test with Redis cache

```

---

## ✅ Requirements Checklist

- [x] TypeScript + Express API
- [x] PostgreSQL with TypeORM
- [x] Redis integration with fallback
- [x] Swagger documentation
- [x] Jest tests (unit + cache miss)
- [x] Dockerized setup

---

## 🧑‍💻 Developer Notes

- Update `.env` or `docker-compose.yml` to modify DB credentials or ports.
- Use `npm run dev` for local development (with hot reload).

---

## Author
- [Rampal Yadav](https://github.com/rampalyadav0001)
- [LinkedIn](https://www.linkedin.com/in/rampal-yadav/)