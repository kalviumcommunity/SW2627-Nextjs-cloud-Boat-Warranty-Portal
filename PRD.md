# 📄 Product Requirements Document (PRD)

# BOAT Warranty Hub

> **Version:** 1.0  
> **Project:** Full-Stack Product Development (Sprint 1)  
> **Duration:** 20 Working Days  
> **Team Size:** 2 Members

---

# Table of Contents

1. Executive Summary
2. Business Problem
3. Stakeholders
4. Business Impact
5. Vision & Objectives
6. Dataset
7. KPIs
8. User Stories
9. Scope
10. Features
11. Requirements
12. Website Structure
13. Technology Stack
14. Database Design
15. API Overview
16. Workflow
17. Security
18. Risks
19. Timeline
20. Future Scope
21. Validation Checklist

---

# 1. Executive Summary

BOAT Warranty Hub is a centralized warranty management platform that enables customers to verify product warranties using a serial number, view repair history, and download warranty PDFs. Administrators manage products, repair records, and warranty documents through a secure dashboard.

The project digitizes warranty verification, reduces manual support effort, and provides a faster, transparent customer experience.

---

# 2. Business Problem

### Problem Statement

Customers currently rely on invoices and customer support to verify warranties, resulting in delays and additional manual work.

### Primary Users

- BOAT Customers
- Customer Support Executives
- Warranty Administrators

### Project Assumptions

- Manual verification requires **5–10 minutes** per request.
- Warranty-related queries are frequent.
- Lost invoices delay verification.
- A self-service portal reduces manual verification effort.

> **Note:** These are project assumptions for the MVP and not official BOAT metrics.

### Success Criteria

Within **30 days**:

- ≥85% warranty lookups completed without support.
- Lookup response ≤2 seconds.
- ≥95% successful warranty PDF downloads.
- ≥70% reduction in manual verification effort.

---

# 3. Stakeholders

| Stakeholder | Responsibility |
|-------------|----------------|
| **Customers** | Search warranty, download PDF, view repairs |
| **Customer Support** | Assist unresolved warranty requests |
| **Administrators** | Manage products, repairs, warranty PDFs, and system data |

---

# 4. Business Impact

### Operational

- Faster warranty verification
- Centralized warranty management
- Reduced manual workload

### Business

- Lower support costs
- Improved customer satisfaction
- Better record management

### Customer Experience

- Instant warranty lookup
- Transparent repair history
- Easy document access

---

# 5. Vision & Objectives

## Vision

Build a secure, modern warranty platform that allows customers to independently verify warranties while providing administrators with efficient management tools.

## Objectives

### Customer

- Verify warranty instantly
- Download warranty PDF
- View repair history

### Business

- Digitize warranty management
- Centralize product records
- Improve operational efficiency

---

# 6. Dataset

| Source | PostgreSQL |
|--------|------------|
| Owner | Warranty Administration |
| ORM | Prisma |

### Tables

- Users
- Products
- Warranty
- RepairHistory

### Key Fields

- serialNumber
- purchaseDate
- warrantyExpiry
- warrantyPdfUrl
- repairDate
- repairStatus

### Data Quality

- Unique serial numbers
- Foreign key constraints
- Zod validation
- Real-time CRUD updates

---

# 7. KPI & Success Metrics

| KPI | Target | Timeline |
|-----|--------|----------|
| Lookup Response | ≤2 sec | Launch |
| Warranty Search Success | ≥95% | 30 Days |
| Manual Verification Reduction | ≥70% | 30 Days |
| PDF Download Success | ≥99% | Launch |
| Admin CRUD Accuracy | 100% | Continuous |

---

# 8. User Stories

### Customer

- **US-01:** As a customer, I want to search using my serial number so that I can verify my warranty.
- **US-02:** As a customer, I want to view repair history so that I know previous service details.
- **US-03:** As a customer, I want to download my warranty PDF so that I always have an official copy.

### Administrator

- **US-04:** As an administrator, I want to manage product records so that warranty information remains accurate.
- **US-05:** As an administrator, I want to upload warranty PDFs so that customers can download them.
- **US-06:** As an administrator, I want to maintain repair history so that product information remains up to date.

---

# 9. Product Scope

## ✅ In Scope

### Customer

- Warranty Lookup
- Product Details
- Repair History
- Warranty PDF Download
- FAQ
- Contact Page

### Administrator

- Login
- Dashboard
- Product CRUD
- Repair CRUD
- PDF Upload
- RBAC

---

## ❌ Out of Scope

- Customer Accounts
- QR Code Lookup
- AI Chatbot
- Mobile App
- Email Notifications
- Warranty Extension

---

# 10. Product Features

| Feature | Description |
|----------|-------------|
| Home | Landing page with warranty search CTA |
| Warranty Lookup | Search using serial number |
| Product Details | Warranty and product information |
| Warranty Status | Active / Expired / Expiring Soon |
| Repair History | Complete repair timeline |
| PDF Download | Secure warranty download |
| Dashboard | Admin overview |
| Product Management | Product CRUD |
| Repair Management | Repair CRUD |
| PDF Upload | Upload warranty documents |
| Responsive UI | Desktop, tablet and mobile support |

---

# 11. Functional & Non-Functional Requirements

## Functional

- Validate serial numbers.
- Display warranty details.
- Display repair history.
- Download warranty PDFs.
- Authenticate administrators.
- Manage products and repairs.
- Upload warranty documents.

## Non-Functional

- Lookup response ≤2 seconds.
- Responsive design.
- Secure authentication.
- Structured logging.
- Modular architecture.
- Cloud deployment.
- Type-safe code.