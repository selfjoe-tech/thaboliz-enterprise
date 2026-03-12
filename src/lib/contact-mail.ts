import "server-only";
import nodemailer from "nodemailer";
import * as React from "react";
import { render } from "@react-email/render";
import ContactConfirmationEmail from "../../emails/ContactConfirmationEmail";
import InternalEnquiryEmail from "../../emails/InternalEnquiryEmail";

type ContactEmailInput = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
};

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export async function sendContactEmail(input: ContactEmailInput) {
  const transporter = nodemailer.createTransport({
    host: requiredEnv("SMTP_HOST"),
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_SECURE ?? "true") === "true",
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    },
  });

  const smtpFrom = process.env.SMTP_FROM ?? requiredEnv("SMTP_USER");
  const contactToEmail = process.env.CONTACT_TO_EMAIL ?? "info@thaboliz.co.za";
  const confirmationFrom = process.env.CONFIRMATION_FROM ?? smtpFrom;
  const websiteUrl = process.env.WEBSITE_URL ?? "https://thaboliz.co.za";
  const logoUrl = `${websiteUrl}/email/thaboliz-logo.png`;

  const internalHtml = await render(
    React.createElement(InternalEnquiryEmail, {
      ...input,
      company: input.company || "N/A",
      logoUrl,
      websiteUrl,
    })
  );

  const confirmationHtml = await render(
    React.createElement(ContactConfirmationEmail, {
      ...input,
      company: input.company || "N/A",
      logoUrl,
      websiteUrl,
    })
  );

  await transporter.sendMail({
    from: `"Thaboliz Website" <${smtpFrom}>`,
    to: contactToEmail,
    replyTo: `"${input.name}" <${input.email}>`,
    subject: `New website enquiry from ${input.name}`,
    html: internalHtml,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      `Company: ${input.company || "N/A"}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
  });

  await transporter.sendMail({
    from: `"Thaboliz" <${confirmationFrom}>`,
    to: input.email,
    subject: "We received your enquiry",
    html: confirmationHtml,
    text: [
      `Hello ${input.name},`,
      "",
      "Thank you for contacting Thaboliz.",
      "We have received your enquiry and a member of our team will get back to you as soon as possible.",
      "",
      "Your submitted details:",
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      `Company: ${input.company || "N/A"}`,
      "",
      "Message:",
      input.message,
      "",
      "Regards,",
      "Thaboliz",
    ].join("\n"),
  });
}