"use client";

import { useState, type FormEvent } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { FadeIn } from "./fade-in";

interface FormData {
  name: string;
  firm: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    firm: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <section id="enquiries" className="px-6 py-16 md:px-12 md:py-24 lg:px-20 max-w-xl">
        <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-8">
          Enquiries.
        </h2>
        <p className="text-ink/70">Thank you. We'll be in touch.</p>
      </section>
    );
  }

  return (
    <FadeIn>
      <section id="enquiries" className="px-6 py-16 md:px-12 md:py-24 lg:px-20 max-w-xl">
        <h2 className="font-display text-2xl md:text-3xl tracking-tight mb-12">
          Enquiries.
        </h2>
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData((d) => ({ ...d, name: e.target.value }))
              }
            />
            {errors.name && (
              <p className="text-sm text-red-700 mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Label htmlFor="firm">Firm</Label>
            <Input
              id="firm"
              type="text"
              value={formData.firm}
              onChange={(e) =>
                setFormData((d) => ({ ...d, firm: e.target.value }))
              }
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((d) => ({ ...d, email: e.target.value }))
              }
            />
            {errors.email && (
              <p className="text-sm text-red-700 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="message">What you're working on</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData((d) => ({ ...d, message: e.target.value }))
              }
            />
          </div>
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send"}
          </Button>
          {status === "error" && (
            <p className="text-sm text-red-700">
              Something went wrong. Please try again or email us directly.
            </p>
          )}
        </form>
      </section>
    </FadeIn>
  );
}
