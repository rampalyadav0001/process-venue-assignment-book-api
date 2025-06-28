
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
git clone <https://github.com/rampalyadav0001/process-venue-assignment-book-api>
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
---
## Real-time Reviews with GraphQL Subscriptions

This project can be extended to support real-time review updates using **Apollo Server** and **GraphQL Subscriptions**.

### How it works

- **GraphQL schema** includes types for `Book`, `Review`, and a `Subscription` for new reviews.
- When a review is added, it is published via Apollo Server's `PubSub`.
- Clients can subscribe to `reviewAdded(bookId: ID!)` to receive real-time updates for specific books.
- **Redis Pub/Sub** is used as the Apollo Server subscription backend, enabling horizontal scaling across multiple server instances.

### Example GraphQL Schema

```graphql
type Book {
    id: ID!
    title: String!
    author: String!
    reviews: [Review!]!
}

type Review {
    id: ID!
    content: String!
    rating: Int!
    bookId: ID!
}

type Subscription {
    reviewAdded(bookId: ID!): Review!
}

type Query {
    books: [Book!]!
    book(id: ID!): Book
}
```

### Implementation Steps

1. **Install dependencies**:
     ```bash
     npm install apollo-server-express graphql graphql-redis-subscriptions ioredis
     ```
2. **Set up Apollo Server** with the schema and resolvers.
3. **Publish new reviews** in the mutation resolver using `pubsub.publish`.
4. **Subscribe** to `reviewAdded` using `pubsub.asyncIterator`.
5. **Configure Redis PubSub** for distributed subscriptions:
     ```ts
     import { RedisPubSub } from 'graphql-redis-subscriptions';
     const pubsub = new RedisPubSub({
         connection: { host: 'localhost', port: 6379 }
     });
     ```

### Usage

- Start the server and connect a GraphQL client (e.g., Apollo Studio).
- Subscribe to:
    ```graphql
    subscription {
        reviewAdded(bookId: "1") {
            id
            content
            rating
        }
    }
    ```
- When a new review is added for that book, subscribers receive updates instantly.

---


## Author
- [Rampal Yadav](https://github.com/rampalyadav0001)
- [LinkedIn](https://www.linkedin.com/in/rampal-yadav/)