# Project Proposal — Caffeine Corner Coffee Shop API

**Student Number:** 0426369 | **Student:** Gursimran Kaur

---

## 1. Project Concept

Caffeine Corner is a backend API for a coffee shop. Customers can browse the menu, place orders, and leave reviews. Admins manage the menu and handle order updates. I picked this because it covers all the course requirements in a way that actually makes sense as a real system — clear resources, clear roles, nothing forced.

---

## 2. Scope and Functionality

The API covers three main resources: Menu Items, Orders, and Reviews.

**Menu Items**
- `GET /menu-items` — no input needed, returns a list of all menu items
- `POST /menu-items` — admin sends name, price, category, and availability; item gets stored and returned
- `PUT /menu-items/:id` — admin sends updated fields; updated item is returned
- `DELETE /menu-items/:id` — admin sends the item id; item gets removed from the database

**Orders**
- `POST /orders` — customer sends their userId and a list of items; API saves the order with a "pending" status and returns the order summary
- `GET /orders/:id` — customer or admin sends the order id; returns that order's details
- `PUT /orders/:id` — admin sends a new status (pending, preparing, or completed); order gets updated

**Reviews**
- `POST /reviews` — customer sends userId, menuItemId, a rating, and a comment; review gets saved
- `GET /reviews/:menuItemId` — no body needed, returns all reviews for that menu item
- `DELETE /reviews/:id` — admin sends the review id; review gets removed

Data is stored in Firebase Firestore. Joi validates all incoming requests before anything gets saved.

---

## 3. Course Content Alignment

Everything in this project connects to what we covered in class:

- **Layered Architecture** (Module 1) — Routes, Controllers, Services, and Repository layers
- **TypeScript** (Module 1) — used throughout for type safety
- **Express Routing, Controllers, Services and Middleware** (Module 2) — how requests flow through each layer of the application
- **Joi Validation and Error Handling** (Module 3) — validates all incoming requests
- **Firebase Firestore** (Module 3) — main database for all resources
- **Firebase Authentication** (Module 4) — handles user login and identity
- **Role-Based Access Control** (Module 4) — Admin and Customer roles using Firebase custom claims
- **Swagger/OpenAPI Documentation** (Module 5) — documents all endpoints
- **Helmet.js and CORS** (Module 5) — security configuration

Nothing here goes outside the course scope.

---

## 4. GitHub Setup

- Repository created using the backend development template
- Branch structure:
  - `main` — final polished code only
  - `development` — ongoing work
  - Feature branches per milestone (e.g. `feature/milestone-1`)
- GitHub Issues used for task tracking, at least five in total across all milestones