Project Overview
BOAT Warranty Hub is a web application where customers can check their product warranty using a serial number. They can also view repair history and download the warranty PDF. Admins can manage products, repairs, and warranty documents through an admin dashboard.

System Architecture
              Customer / Admin
                     │
                     ▼
            Next.js Frontend (UI)
                     │
                     ▼
        Route Handlers / Server Actions
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   NextAuth.js    Prisma ORM   Google Cloud Storage
(Authentication)      │        (Warranty PDFs)
                       │
                       ▼
                PostgreSQL Database
                       │
                       ▼
              Hosted on Vercel

Main Components
| Component            | Purpose                                   |
| -------------------- | ----------------------------------------- |
| Next.js              | Builds the user interface                 |
| NextAuth.js          | Handles admin login                       |
| Prisma               | Connects the app with the database        |
| PostgreSQL           | Stores product, warranty, and repair data |
| Google Cloud Storage | Stores warranty PDF files                 |
| Vercel               | Hosts the application                     |

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