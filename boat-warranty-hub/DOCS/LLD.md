Warranty Search Flow
Customer enters Serial Number
            │
            ▼
Serial Number is validated
            │
            ▼
Search data in PostgreSQL
            │
            ▼
Fetch Product Details
            │
            ▼
Fetch Repair History
            │
            ▼
Show Result on Screen

Admin Workflow
Admin Login
      │
      ▼
Dashboard
      │
      ├── Add Product
      ├── Update Product
      ├── Delete Product
      ├── Manage Repairs
      └── Upload Warranty PDF

Database Tables

User  
id
name
email
password
role

Product
id
serialNumber
name
model
purchaseDate
warrantyExpiry
warrantyPdfUrl

Repair History
id
productId
issue
repairDate
status
remarks

Database Relationship
User
 │
 └── Manages
        │
        ▼
     Product
        │
        └── Has Many
              │
              ▼
        Repair History

API Flow
User Request
      │
      ▼
Route Handler
      │
      ▼
Prisma
      │
      ▼
PostgreSQL
      │
      ▼
Return Data to User

Authentication Flow
Admin Login
      │
      ▼
NextAuth.js
      │
      ▼
Verify User
      │
      ▼
Open Dashboard

PDF Upload Flow
Admin Uploads PDF
        │
        ▼
Store PDF in Google Cloud Storage
        │
        ▼
Save PDF Link in PostgreSQL
        │
        ▼
Customer Can Download PDF

Deployment
Developer
     │
     ▼
GitHub
     │
     ▼
Vercel
     │
     ▼
Users Access Website