import nodemailer from "nodemailer";

export async function sendWelcomeEmail(toEmail) {
  // Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

  // Email options
  const mailOptions = {
    from: `"SAS Team" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to SAS — Your Style Journey Begins!",
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 24px; background-color: #fdf3e7; color: #1B3B50;">
        <h2 style="font-size: 24px; margin-bottom: 12px;"> Welcome to the SAS Family!</h2>
        <p style="font-size: 16px; line-height: 1.6;">
        Thank you for joining <strong>SAS</strong>, your trusted destination for quality fashion and effortless style.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
        We’re delighted to have you on board. Explore our latest collections, enjoy exclusive member offers, and make every outfit count.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
        Start your style journey with confidence — we’re here to help you look and feel your best.
        </p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size: 14px; color: #555;">
        Need assistance or have questions? Our customer support team is available 24/7 — just reply to this email or visit our 
        <a href="https://www.sasyouaremadetobethebest.shop/#contact" style="color: #1B3B50; text-decoration: underline;">Contact Page</a>.
        </p>
        <p style="font-size: 14px; margin-top: 20px;">Warm regards,<br/>The SAS Team </p>
    </div>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
