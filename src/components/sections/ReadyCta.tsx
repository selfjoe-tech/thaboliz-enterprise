"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export default function ReadyCTA() {
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      // TODO: Replace with your real endpoint (API route / server action)
      await new Promise((r) => setTimeout(r, 650));

      setStatus("sent");
      setEmail("");
      setSubject("");
      setBody("");
      setTimeout(() => setStatus("idle"), 1500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-none border border-white/10 bg-white/[0.02] p-6 md:p-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Ready to work with us?
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Tell us what you need. We’ll respond with the best next step for your project.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="cta-email" className="text-white/80">
                Your email
              </Label>
              <Input
                id="cta-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="rounded-none border-white/10 bg-black/40 text-white placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cta-subject" className="text-white/80">
                Subject
              </Label>
              <Input
                id="cta-subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What can we help you with?"
                className="rounded-none border-white/10 bg-black/40 text-white placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cta-body" className="text-white/80">
                Message
              </Label>
              <Textarea
                id="cta-body"
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Give us a quick overview (scope, location, timeline, budget range if available)…"
                className="min-h-[140px] rounded-none border-white/10 bg-black/40 text-white placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/50">
                By sending, you agree we may contact you about your request.
              </p>

              <Button
                type="submit"
                disabled={status === "sending"}
                className="rounded-none bg-primary text-white hover:opacity-90"
              >
                <Send className="mr-2 h-4 w-4" />
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send message"}
              </Button>
            </div>

            {status === "error" ? (
              <p className="text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
