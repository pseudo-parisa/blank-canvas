# Blank Canvas — Database Design

## 1. Database

Blank Canvas uses PostgreSQL as its primary relational database.

Prisma is used as the ORM and migration system.

---

## 2. Core Entities

The initial database contains the following entities:

- User
- Artwork
- Auction
- Bid
- Watchlist
- Notification
- Report

---

## 3. User

Stores account and authentication information.

Fields:

- id
- email
- passwordHash
- role
- createdAt
- updatedAt

Roles:

- BUYER
- SELLER
- ADMIN

Relationships:

- User has many artworks
- User has many bids
- User has many watchlist entries
- User has many notifications
- User may create reports

---

## 4. Artwork

Represents an artwork listed by a seller.

Fields:

- id
- sellerId
- title
- description
- artistName
- medium
- year
- category
- imageUrl
- createdAt
- updatedAt

Relationships:

- Artwork belongs to a User as seller
- Artwork may have one Auction

---

## 5. Auction

Represents an auction associated with an artwork.

Fields:

- id
- artworkId
- startingPrice
- currentPrice
- minimumBidIncrement
- startTime
- endTime
- status
- winnerId
- createdAt
- updatedAt

Auction statuses:

- UPCOMING
- ACTIVE
- ENDED
- CANCELLED

Relationships:

- Auction belongs to Artwork
- Auction has many Bids
- Auction may have one winning User

---

## 6. Bid

Represents an individual bid.

Fields:

- id
- auctionId
- bidderId
- amount
- createdAt

Relationships:

- Bid belongs to Auction
- Bid belongs to User

Bid records are retained as historical records and are not overwritten when a new bid is placed.

---

## 7. Watchlist

Represents an auction saved by a user.

Fields:

- id
- userId
- auctionId
- createdAt

Constraints:

- A user should not be able to save the same auction multiple times.

---

## 8. Notification

Represents an in-app notification.

Fields:

- id
- userId
- type
- message
- read
- createdAt

Potential notification types:

- OUTBID
- AUCTION_WON
- AUCTION_ENDED
- AUCTION_STARTED

---

## 9. Report

Represents a user report submitted for moderation.

Fields:

- id
- reporterId
- artworkId
- reason
- status
- createdAt
- resolvedAt

Potential statuses:

- OPEN
- REVIEWING
- RESOLVED
- DISMISSED

---

## 10. Relationships

```text
User
 |
 ├───────────────< Artwork
 |
 ├───────────────< Bid
 |
 ├───────────────< Watchlist
 |
 ├───────────────< Notification
 |
 └───────────────< Report


Artwork
 |
 └───────────────1 Auction
                       |
                       └───────────────< Bid


Auction
 |
 ├───────────────< Bid
 |
 └───────────────< Watchlist