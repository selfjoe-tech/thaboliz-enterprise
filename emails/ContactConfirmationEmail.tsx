import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Button,
} from "@react-email/components";

type Props = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  logoUrl: string;
  websiteUrl: string;
};

export default function ContactConfirmationEmail({
  name,
  email,
  phone,
  company,
  message,
}: Props) {

  const websiteUrl = process.env.WEBSITE_URL ?? "https://thaboliz.co.za";
    const logoUrl = `${websiteUrl}/email/t-logo.png`;
    const heroImageUrl = `${websiteUrl}/email/pic-1.jpg`;
  return (
    <Html lang="en">
      <Head />
      <Preview>We received your enquiry</Preview>
      <Body style={styles.body}>
        <Container style={styles.outer}>
          <Section style={styles.logoWrap}>
            <Img src={logoUrl} alt="Thaboliz" width="160" style={styles.logo} />          
          </Section>

          <Container style={styles.card}>
            <Heading style={styles.heading}>We received your enquiry</Heading>
            <Section style={styles.heroImageWrap}>
              <Img
                src={heroImageUrl}
                alt="Thaboliz project presentation"
                width="584"
                style={styles.heroImage}
              />
            </Section>
            

            <Section style={styles.introBox}>
              <Text style={styles.introText}>Good day {name},</Text>
              <br />
              <Text style={styles.introText}>
                Thank you for reaching out to Thaboliz. A member of our team will review your message and respond as soon as possible. Below is a copy of the details
                you submitted.
                <br/>
                <br />
                Kind Regards
              </Text>
            </Section>

            <Hr style={styles.hr} />

            <Detail label="Full name" value={name} />
            <Detail label="Email address" value={email} />
            <Detail label="Phone number" value={phone} />
            <Detail label="Company" value={company || "N/A"} />

            <Section style={styles.messageBox}>
              <Text style={styles.messageLabel}>Your message</Text>
              <Text style={styles.messageText}>{message}</Text>
            </Section>

            <Section style={styles.buttonWrap}>
              <Button href={websiteUrl} style={styles.button}>
                Visit our website
              </Button>
            </Section>
          </Container>

        </Container>
      </Body>
    </Html>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Section style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </Section>
  );
}

const styles = {

  heroImageWrap: {
  paddingTop: "22px",
},
heroImage: {
  display: "block",
  width: "100%",
  maxWidth: "400px",
  height: "auto",
  borderRadius: "6px",
},

  body: {
    margin: "0",
    padding: "0",
    backgroundColor: "#ffffff",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  outer: {
    maxWidth: "640px",
    margin: "0 auto",
    padding: "32px 16px",
  },
  logoWrap: {
    backgroundColor: "black",
    textAlign: "center" as const,
    padding: "16px",
    borderRadius: "2px"
  },
  logo: {
    margin: "0 auto",
    display: "block",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "2px",
    padding: "32px 28px",
  },
  eyebrow: {
    margin: "0 0 10px",
    fontSize: "12px",
    lineHeight: "18px",
    letterSpacing: "0.16em",
    color: "#9ca3af",
    fontWeight: "700",
  },
  heading: {
    margin: "0",
    fontSize: "28px",
    lineHeight: "34px",
    color: "#111827",
  },
  subtext: {
    margin: "12px 0 0",
    fontSize: "15px",
    lineHeight: "24px",
    color: "#4b5563",
  },
  introBox: {
    marginTop: "22px",
    padding: "18px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
  },
  introText: {
    margin: "0 0 10px",
    fontSize: "15px",
    lineHeight: "24px",
    color: "#111827",
  },
  hr: {
    borderColor: "#e5e7eb",
    margin: "24px 0",
  },
  detailRow: {
    margin: "0 0 10px",
  },
  detailLabel: {
    margin: "0",
    fontSize: "13px",
    lineHeight: "18px",
    color: "#6b7280",
    fontWeight: "700",
  },
  detailValue: {
    margin: "4px 0 0",
    fontSize: "15px",
    lineHeight: "24px",
    color: "#111827",
  },
  messageBox: {
    marginTop: "22px",
    padding: "18px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
  },
  messageLabel: {
    margin: "0 0 8px",
    fontSize: "13px",
    lineHeight: "18px",
    color: "#6b7280",
    fontWeight: "700",
  },
  messageText: {
    margin: "0",
    fontSize: "15px",
    lineHeight: "25px",
    color: "#111827",
    whiteSpace: "pre-wrap" as const,
  },
  buttonWrap: {
    paddingTop: "24px",
  },
  button: {
    backgroundColor: "#111111",
    color: "#ffffff",
    borderRadius: "999px",
    textDecoration: "none",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
  },
  footer: {
    textAlign: "center" as const,
    color: "#9ca3af",
    fontSize: "12px",
    lineHeight: "18px",
    margin: "18px 0 0",
  },
};