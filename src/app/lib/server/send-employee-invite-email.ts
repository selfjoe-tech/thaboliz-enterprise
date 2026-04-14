import nodemailer from "nodemailer";

type Args = {
  to: string;
  companyName: string;
  inviterEmail: string;
  role: string;
  acceptUrl: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmployeeInviteEmail({
  to,
  companyName,
  inviterEmail,
  role,
  acceptUrl,
}: Args) {
  await transporter.sendMail({
    from: `"Thaboliz" <${process.env.SMTP_FROM}>`,
    to,
    subject: `You have been invited to ${companyName}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
        <h2>You have been invited</h2>
        <p>You have been invited to join <strong>${companyName}</strong> as <strong>${role}</strong>.</p>
        <p>Invited by: ${inviterEmail}</p>
        <p>
          <a href="${acceptUrl}" style="display:inline-block;padding:12px 18px;background:#111;color:#fff;text-decoration:none;border-radius:8px;">
            Accept invite
          </a>
        </p>
        <p>If you do not already have an account, sign up first with this same email address.</p>
      </div>
    `,
  });
}