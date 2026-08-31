Project Overview
BOAT Warranty Hub is a web application where customers can check their product warranty using a serial number. They can also view repair history and download the warranty PDF. Admins can manage products, repairs, and warranty documents through an admin dashboard.

System Architecture
              Customer / Admin / Diagnostic Client
                             │
                             ▼
                    Next.js Frontend (UI)
                             │
                             ▼
                Route Handlers / Server Actions
                             │
         ┌───────────────────┼───────────────────┬───────────────────┐
         ▼                   ▼                   ▼                   ▼
    NextAuth.js         Prisma ORM      Google Cloud Storage   Diagnostics & Hoisting
 (Authentication)            │            (Warranty PDFs)         Execution Engine
                             ▼                                  (Telemetry & Rules)
                    PostgreSQL Database
                             │
                             ▼
                    Hosted on Vercel

Main Components
| Component                           | Purpose                                                           |
| ----------------------------------- | ----------------------------------------------------------------- |
| Next.js                             | Builds the user interface and API Route Handlers                  |
| NextAuth.js                         | Handles admin authentication and session management               |
| Prisma                              | Connects the app with PostgreSQL database                         |
| PostgreSQL                          | Stores product, warranty, and repair data                         |
| Google Cloud Storage                | Stores warranty PDF files                                         |
| Diagnostics & Hoisting Engine       | Evaluates warranty policy rules, telemetry & JS hoisting patterns |
| Vercel                              | Hosts the application                                             |

Customer Flow
Open Website
      │
      ▼
Enter Serial Number
      │
      ▼
Search Warranty
      │
      ▼
View Product Details
      │
      ▼
View Repair History
      │
      ▼
Download Warranty PDF

Admin Flow
Login
   │
   ▼
Dashboard
   │
   ├── Manage Products
   ├── Manage Repairs
   └── Upload Warranty PDF

Diagnostics & Telemetry Engine Flow
Client / Admin Diagnostics Request
               │
               ▼
   /api/diagnostics/system | /api/diagnostics/hoisting-engine | /api/diagnostics/rules
               │
               ▼
   Top-Down Declarative Pipeline (Function Declaration Hoisting)
               │
               ├── Runtime Telemetry Collection (Memory / Node.js)
               ├── Hoisting Mechanics Introspection (Var / TDZ / Mutual Recursion)
               ├── Warranty Policy Rule Tree Validation
               └── Risk Scoring & Recommendations Engine