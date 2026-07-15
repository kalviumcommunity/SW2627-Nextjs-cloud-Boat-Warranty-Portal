# BOAT Warranty Hub - Backend Architecture

## Sahaj Srivastava(Backend Developer)

## Backend Technology Stack

| Technology | Purpose |
|------------|---------|
| Next.js App Router | Full-stack Framework |
| Route Handlers | Public API Endpoints |
| Server Actions | Internal Form Mutations |
| Prisma ORM | Database ORM |
| PostgreSQL | Primary Database |
| NextAuth | Authentication & Sessions |
| bcrypt | Password Hashing |
| Zod | Request Validation |
| Google Cloud Storage | Warranty PDF Storage |
| Pino | Logging |
| Docker | Containerization |
| GitHub Actions | CI/CD |
| Middleware | Route Protection |

---

# Backend Folder Structure

```text
app/
│
├── api/
│   │
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.js
│   │
│   ├── warranty/
│   │   └── [serial]/
│   │       └── route.js
│   │
│   ├── products/
│   │   ├── route.js
│   │   └── [id]/
│   │       └── route.js
│   │
│   ├── repairs/
│   │   ├── route.js
│   │   └── [id]/
│   │       └── route.js
│   │
│   ├── upload/
│   │   └── route.js
│   │
│   └── dashboard/
│       └── stats/
│           └── route.js
│
├── actions/
│   │
│   ├── auth.actions.js
│   ├── warranty.actions.js
│   ├── product.actions.js
│   ├── repair.actions.js
│   └── upload.actions.js
│
├── middleware.js
│
├── lib/
│   │
│   ├── prisma.js
│   ├── auth.js
│   ├── storage.js
│   ├── logger.js
│   ├── validations.js
│   ├── constants.js
│   └── utils.js
│
├── services/
│   │
│   ├── warranty.service.js
│   ├── product.service.js
│   ├── repair.service.js
│   ├── upload.service.js
│   └── dashboard.service.js
│
├── repositories/ (done)
│   │
│   ├── product.repository.js
│   ├── repair.repository.js
│   ├── warranty.repository.js
│   └── user.repository.js
│
├── prisma/  (done)
│   │
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
│
│  
│
├── logs/
│
└── tests/
    ├── api/
    └── services/
```

---

# Backend Layers

```
                Frontend

                    │

                    ▼

          Route Handlers / Server Actions

                    │

                    ▼

            Zod Validation Layer

                    │

                    ▼

          Authentication (NextAuth)

                    │

                    ▼

            Business Services Layer

                    │

                    ▼

          Repository / Data Layer

                    │

                    ▼

                Prisma ORM

                    │

          ┌─────────┴──────────┐
          │                    │
          ▼                    ▼

     PostgreSQL        Google Cloud Storage
```

# Database Architecture

```text
                User
                 │
                 │
                 │
                 ▼
             Product
                 │
        ┌────────┴─────────┐
        ▼                  ▼
 RepairHistory       Warranty PDF
                             │
                             ▼
                   Google Cloud Storage
```