# 🎨 Blank Canvas

**Blank Canvas** is a modern art marketplace and auction platform designed to connect artists and collectors through artwork discovery, curated collections, and live auctions.

The project is being built as a full-stack portfolio application with a strong focus on **clean UI/UX, scalable architecture, authentication, role-based workflows, and real-world auction functionality**.

---

## ✨ Project Overview

Blank Canvas reimagines a traditional art marketplace as a digital-first auction platform.

The goal is to create a polished experience where:

* 🎨 Artists can showcase and manage their artwork
* 🛍️ Buyers can discover and collect artwork
* 🔨 Collectors can participate in auctions
* 👤 Users can manage their accounts and activity
* 🛡️ Administrators can manage the platform
* 📊 The platform can support real marketplace and auction workflows

The project is being developed progressively, starting with the visual experience and marketplace structure before introducing the more complex backend functionality.

---

## 🛠️ Tech Stack

### Frontend
* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Lucide React

### Backend
- Node.js
- NestJS
- TypeScript

### Database
- PostgreSQL
- Prisma

### Real-Time
- WebSockets
- Socket.IO

### Storage
- Cloudinary

### Development
* Git
* GitHub
* VS Code

## 🏗️ Project Structure

```text
blank-canvas/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── artwork/
│   │   │   ├── auction/
│   │   │   ├── common/
│   │   │   └── layout/
│   │   │
│   │   ├── features/
│   │   │   ├── mockArtworks.ts
│   │   │   └── mockAuctions.ts
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Browse.tsx
│   │   │   ├── ArtworkDetail.tsx
│   │   │   ├── Auctions.tsx
│   │   │   └── AuctionDetail.tsx
│   │   │
│   │   ├── types/
│   │   │   ├── artwork.ts
│   │   │   └── auction.ts
│   │   │
│   │   ├── App.tsx
│   │   └── index.css
│   │
│   └── ...
│
├── roadmap.md
└── README.md
```

---

## 🎯 Application Flow

The current marketplace experience follows this structure:

```text
Landing Page
     │
     ├───────────────┐
     ↓               ↓
 Browse           Auctions
     │               │
     ↓               ↓
Artwork Card     Auction Card
     │               │
     ↓               ↓
Artwork Detail   Auction Detail
                     │
                     ↓
                 Bid Interface
```

```text
Authentication
      │
      ├── Buyer
      │     ├── Browse
      │     ├── Wishlist
      │     ├── Bidding
      │     └── Purchases
      │
      ├── Seller
      │     ├── Artwork Management
      │     ├── Listings
      │     └── Auction Management
      │
      └── Admin
            ├── User Management
            ├── Artwork Moderation
            └── Platform Management
```

---

## 🧩 Development Approach

Blank Canvas is being developed incrementally rather than building the entire application at once.

👉 **[View the Development Roadmap](roadmap.md)**

## 👩‍💻 Developer

**Parisa Abbas**

Computer Science Student
Universiti Sains Malaysia

---

## 📄 Project Status

**Current milestone:**

> **Phase 2 — Core UI & Marketplace Experience ✅**

The next major milestone is the implementation of **authentication and role-based user workflows**.
