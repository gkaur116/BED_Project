# New Component Plan — Nodemailer

## Selected Component
Nodemailer

## What It Does
Nodemailer is a Node.js module that allows you to send emails from your application. It supports various email services like Gmail, Outlook, and custom SMTP servers.

## Why I Chose It
Nodemailer fits naturally into the Caffeine Corner Coffee Shop API. When a customer places an order, they should receive a confirmation email with their order details. This adds real practical value to the API without being overly complex to implement.

## How I Plan to Use It
- When a customer successfully places an order via `POST /orders`, Nodemailer will automatically send a confirmation email to the customer
- The email will include the order summary, total price, and estimated status
- It will be implemented as a service called `emailService.ts` that gets called from the order service after an order is saved to Firestore

## Integration Plan
- Install Nodemailer: `npm install nodemailer` and `npm install @types/nodemailer --save-dev`
- Create `src/api/v1/services/emailService.ts`
- Call `emailService` from `orderService` after a successful order creation
- Store email credentials securely in `.env` file