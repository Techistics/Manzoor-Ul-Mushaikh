"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";

type NewsletterConfig = {
  placeholder: string;
  submitLabel: string;
  emailLabel: string;
  successMessage: string;
  errorMessage: string;
};

export function NewsletterForm({ config }: { config: NewsletterConfig }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setIsValid(isEmailValid);
    setMessage(isEmailValid ? config.successMessage : config.errorMessage);
  };

  return (
    <form className="mt-4" noValidate onSubmit={handleSubmit}>
      <div className="flex min-h-11 overflow-hidden rounded-full bg-white p-1 text-ink">
        <label className="flex min-w-0 flex-1 items-center gap-3 pl-3">
          <Mail aria-hidden="true" className="size-5 shrink-0 text-ink/70" />
          <span className="sr-only">{config.emailLabel}</span>
          <input
            aria-describedby="footer-newsletter-message"
            aria-invalid={isValid === false}
            autoComplete="email"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
              setIsValid(null);
            }}
            placeholder={config.placeholder}
            type="email"
            value={email}
          />
        </label>
        <button
          className="shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-ink transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          type="submit"
        >
          {config.submitLabel}
        </button>
      </div>
      <p
        aria-live="polite"
        className={`mt-2 min-h-5 text-sm ${
          isValid === false
            ? "text-red-300"
            : isValid
              ? "text-emerald-300"
              : "text-transparent"
        }`}
        id="footer-newsletter-message"
        role="status"
      >
        {message}
      </p>
    </form>
  );
}
