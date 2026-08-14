# 🛠️ Warranty Management System

**Author:** **Satvik Sindhwani**

---

# 📌 Website Architecture

                              Home
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
      About                 Warranty               Contact
                                │
                                ▼
                     Warranty Lookup
                                │
               ┌────────────────┴────────────────┐
               │                                 │
        Product Found                    Product Not Found
               │
               ▼
        Product Details
               │
        ├── Warranty Status
        ├── Repair Timeline
        └── Download PDF
```

---

# 📁 Frontend Folder Structure

```text
app/
│
├── layout.jsx                     # Global Layout
├── page.jsx                       # Landing Page
│
├── about/
│   └── page.jsx
│
├── warranty/
│   └── page.jsx
│
├── product/
│   └── [serial]/
│       └── page.jsx
│
├── faq/
│   └── page.jsx
│
├── contact/
│   └── page.jsx
│
├── login/
│   └── page.jsx
│
├── repair/
│   └── page.jsx
│
├── admin/
│   ├── layout.jsx
│   ├── page.jsx
│   │
│   ├── products/
│   │   └── page.jsx
│   │
│   ├── repairs/
│   │   └── page.jsx
│   │
│   ├── upload/
│   │   └── page.jsx
│   │
│   └── Add product/
│       └── page.tsx
│
components/
│
├── layout/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Sidebar.jsx
│   ├── AdminSidebar.jsx
│   └── DashboardHeader.jsx
│
├── common/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Table.jsx
│   ├── Modal.jsx
│   ├── Badge.jsx
│   ├── Loader.jsx
│   ├── EmptyState.jsx
│   ├── ErrorState.jsx
│   └── SearchBar.jsx
│
├── home/
│   ├── Hero.jsx
│   ├── Features.jsx
│   ├── CTA.jsx
│   └── FAQPreview.jsx
│
├── warranty/
│   ├── WarrantySearch.jsx
│   ├── WarrantyCard.jsx
│   ├── ProductInfo.jsx
│   ├── WarrantyStatus.jsx
│   ├── RepairTimeline.jsx
│   └── DownloadPDFButton.jsx
│
├── admin/
│   ├── DashboardCards.jsx
│   ├── ProductTable.jsx
│   ├── ProductForm.jsx
│   ├── RepairTable.jsx
│   ├── RepairForm.jsx
│   ├── UploadForm.jsx
│   └── StatsChart.jsx
│
styles/
│
├── globals.css
└── theme.css

---

# 📂 Project Overview

### Public Pages

- 🏠 Home
- ℹ️ About
- 🛡️ Warranty
- ❓ FAQ
- 📞 Contact
- 🔐 Login
- 🔧 Repair

---

### Warranty Module

- Warranty Lookup
- Product Details
- Warranty Status
- Repair Timeline
- Download Warranty PDF

---

### Admin Module

- Admin Dashboard
- Product Management
- Repair Management
- Upload Products
- Add Product
- Dashboard Statistics

---

### Reusable Components

#### Layout Components

- Navbar
- Footer
- Sidebar
- Admin Sidebar
- Dashboard Header

#### Common Components

- Button
- Input
- Card
- Table
- Modal
- Badge
- Loader
- Empty State
- Error State
- Search Bar

#### Home Components

- Hero Section
- Features
- CTA Section
- FAQ Preview

#### Warranty Components

- Warranty Search
- Warranty Card
- Product Information
- Warranty Status
- Repair Timeline
- Download PDF Button

#### Admin Components

- Dashboard Cards
- Product Table
- Product Form
- Repair Table
- Repair Form
- Upload Form
- Statistics Chart

---

# 🎨 Styling

styles/
├── globals.css
└── theme.css
