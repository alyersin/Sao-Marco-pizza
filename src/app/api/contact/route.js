import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    const response = await axios.post(
      "https://api.mailersend.com/v1/email",
      {
        from: {
          email: process.env.MAILERSEND_SENDER_EMAIL,
          name: "Pizza San Marco Contact",
        },
        to: [{ email: process.env.RECEIVER_EMAIL, name: "Admin" }],
        subject: "New Contact Form Submission",
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
