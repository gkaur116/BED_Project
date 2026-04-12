import nodemailer from "nodemailer";

/**
 * Sends an order confirmation email to the customer
 * @param toEmail - The customer's email address
 * @param orderId - The ID of the created order
 * @param totalPrice - The total price of the order
 * @param items - The list of items in the order
 * @returns Promise<void>
 */
export const sendOrderConfirmationEmail = async (
  toEmail: string,
  orderId: string,
  totalPrice: number,
  items: string[]
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Caffeine Corner - Order Confirmation",
    text: `Thank you for your order!\n\nOrder ID: ${orderId}\nItems: ${items.join(", ")}\nTotal: $${totalPrice}\n\nWe will notify you when your order is ready.`,
  };

  await transporter.sendMail(mailOptions);
};