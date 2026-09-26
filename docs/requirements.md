# Blank Canvas — Project Requirements

## 1. Project Overview

Blank Canvas is a full-stack online art auction marketplace where artists can list artwork for auction and buyers can discover artwork, place bids, track auctions, and receive real-time auction updates.

The application supports three primary roles:

- Buyer
- Seller
- Admin

The project is designed as a portfolio-focused full-stack application demonstrating modern frontend development, backend architecture, relational database design, authentication, role-based authorization, real-time communication, validation, and cloud deployment.

---

## 2. User Roles

### Buyer

A buyer can:

- Register and log in
- Browse artwork
- Search and filter artwork
- View artwork details
- View auction details
- Place bids
- View bid history
- See whether they are currently winning or have been outbid
- Save auctions to a watchlist
- View won auctions
- Manage their profile

### Seller

A seller can:

- Register and log in
- Create artwork listings
- Upload artwork images
- Edit artwork listings
- Delete eligible artwork listings
- Create auctions
- Set starting prices
- Set minimum bid increments
- Set auction start and end times
- View active auctions
- View bids on their auctions
- View completed auctions
- View basic auction and sales analytics

### Admin

An admin can:

- View users
- Suspend users
- View artwork listings
- Remove artwork listings
- View auctions
- Cancel auctions when necessary
- Review reported content

---

## 3. Core Features

### Authentication

- User registration
- User login
- User logout
- Password hashing
- JWT authentication
- Protected routes
- Role-based authorization

### Artwork Marketplace

- Artwork creation
- Artwork editing
- Artwork deletion
- Artwork image upload
- Artwork browsing
- Artwork search
- Artwork filtering
- Artwork detail pages

### Auctions

- Auction creation
- Auction start and end times
- Starting price
- Minimum bid increment
- Auction status
- Auction countdown
- Auction ending
- Winner determination

### Bidding

- Place bid
- Validate bid amount
- Store bid history
- Display current highest bid
- Display winning/outbid status
- Prevent invalid bids
- Prevent bids on ended auctions

### Real-Time Updates

Auction viewers should receive bid updates without manually refreshing the page.

### Watchlist

Users can save auctions for later viewing.

### Dashboards

Buyer:
- Active bids
- Outbid auctions
- Won auctions
- Watchlist

Seller:
- Active auctions
- Completed auctions
- Bid activity
- Basic sales/auction analytics

Admin:
- Users
- Artwork
- Auctions
- Reports

---

## 4. Auction Rules

### Auction States

An auction can be:

- UPCOMING
- ACTIVE
- ENDED
- CANCELLED

### Starting Price

The first valid bid must satisfy the auction's minimum bid requirement.

### Minimum Bid Increment

Every subsequent bid must be greater than the current highest bid by at least the configured minimum bid increment.

### Auction Expiration

Once the auction end time has passed:

- New bids are rejected
- The auction becomes ENDED
- The highest valid bidder becomes the winner

### Server Authority

Auction status and bid validity are determined by the backend.

The frontend countdown is only a visual representation and is not trusted for security or auction validity.

---

## 5. Security Requirements

- Passwords must never be stored in plaintext.
- Protected API routes require authentication.
- Role-based permissions must be enforced on the backend.
- Users may only modify resources they are authorized to modify.
- Bid validation must occur server-side.
- Expired auctions must reject new bids server-side.
- Sensitive environment variables must not be committed to Git.
- API input must be validated.

---

