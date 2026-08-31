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

Diagnostics & Hoisting Execution Engine Architecture

1. Hoisting Pipeline Orchestration (Top-Down Declarative Flow)
   runFullSystemDiagnostics() / evaluateWarrantyDiagnostics()
                   │
                   ├──> collectSystemMetrics() [Hoisted Worker]
                   ├──> runEngineSelfCheck() [Hoisted Worker]
                   ├──> calculateOverallHealthScore() [Hoisted Worker]
                   └──> formatDiagnosticReport() [Hoisted Worker]

2. Execution Context & Hoisting Introspection Module
   analyzeHoistingMechanics()
                   │
                   ├──> inspectFunctionHoisting() (Complete body hoisted to Variable Environment)
                   ├──> inspectVarHoisting() (var initialized to undefined in Creation Phase)
                   ├──> inspectTemporalDeadZone() (let, const, class uninitialized in TDZ)
                   ├──> inspectScopeShadowing() (Local scope shadowing resolution)
                   └──> inspectMutualRecursionPipeline() (stepPing <--> stepPong mutual recursion)

3. Warranty Policy Rule Tree
   - RULE_SERIAL_FORMAT: Minimum 4 characters format check
   - RULE_WARRANTY_VALIDITY: Active status and expiration date validation
   - RULE_REPAIR_FREQUENCY: Anomaly check on repair volume (threshold <= 5)
   - RULE_CLAIM_THRESHOLD: Financial automated threshold validation (<= $10,000)

4. Diagnostic API Handlers
   - GET /api/diagnostics/hoisting-engine: Introspection report & benchmarks
   - POST /api/diagnostics/hoisting-engine: Evaluates telemetry/claim payload
   - GET /api/diagnostics/system: System metrics & health scoring (?includeDetails=true)
   - GET /api/diagnostics/rules: Rule catalog
   - POST /api/diagnostics/rules: Rule evaluation engine