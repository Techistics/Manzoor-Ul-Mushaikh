"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Container } from "@/src/components/ui/Container";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { ImagePlaceholder } from "@/src/components/ui/ImagePlaceholder";
import { siteConfig } from "@/src/config/site";

const donationPresets = [100, 200, 300, 500, 1000];
const frequencies = ["One time", "Daily", "Monthly"] as const;

type DonationErrors = {
  amount?: string;
  name?: string;
  email?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatAmount(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString("en-PK")}`;
}

export function Donation() {
  const [amount, setAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(100);
  const [currency, setCurrency] = useState<string>(
    siteConfig.donation.currencies[0],
  );
  const [frequency, setFrequency] =
    useState<(typeof frequencies)[number]>("Monthly");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<DonationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const donationImage = siteConfig.images.donation;
  const progress = Math.min(
    100,
    Math.max(
      0,
      (siteConfig.donation.raised / siteConfig.donation.goal) * 100,
    ),
  );
  const clearSubmission = () => setSubmitted(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: DonationErrors = {};
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      nextErrors.amount = "Enter an amount greater than 0.";
    }
    if (!name.trim()) {
      nextErrors.name = "Enter your name.";
    }
    if (!isValidEmail(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setAmount("");
    setSelectedPreset(100);
    setCurrency(siteConfig.donation.currencies[0]);
    setFrequency("Monthly");
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(true);
  }

  return (
    <section
      aria-labelledby="donate-heading"
      className="py-16 md:py-20"
      id="donate"
    >
      <Container>
        <FadeIn className="mx-auto mb-9 max-w-[660px] text-center md:mb-12">
          <h2
            className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl"
            id="donate-heading"
          >
            Make Your Donation
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Your support keeps our water plant, pharmacy, madrassah and kitchen running for those in need.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="flex flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-[0_16px_50px_rgba(15,42,51,0.09)] lg:flex-row">
            <div className="relative h-[220px] shrink-0 overflow-hidden lg:h-auto lg:w-[26%]">
              {typeof donationImage === "string" ? (
                <Image
                  alt="A donation box supporting people in need"
                  className="object-cover"
                  fill
                  sizes="(max-width: 1023px) 100vw, 26vw"
                  src={donationImage}
                />
              ) : (
                <ImagePlaceholder
                  className="absolute inset-0 h-full w-full"
                  aspectRatio="auto"
                />
              )}
            </div>

            <form
              className="flex min-w-0 flex-1 flex-col gap-5 p-6 sm:p-8"
              noValidate
              onSubmit={handleSubmit}
            >
              <fieldset>
                <legend className="mb-3 font-bold text-ink">
                  Choose Your Amount:
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {donationPresets.map((preset) => {
                    const selected = selectedPreset === preset;

                    return (
                      <button
                        aria-pressed={selected}
                        className={`min-w-[82px] rounded-full border px-4 py-2 text-sm font-semibold transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                          selected
                            ? "scale-[1.03] border-primary-deep bg-primary-deep text-white"
                            : "border-border bg-white text-ink hover:border-primary"
                        }`}
                        key={preset}
                        onClick={() => {
                          setAmount(String(preset));
                          setSelectedPreset(preset);
                          setErrors((current) => ({
                            ...current,
                            amount: undefined,
                          }));
                          clearSubmission();
                        }}
                        type="button"
                      >
                        {formatAmount(preset, currency)}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <label
                    className="shrink-0 text-sm font-semibold text-ink"
                    htmlFor="donation-amount"
                  >
                    Enter Your Amount
                  </label>
                  <div
                    className={`flex min-w-[140px] flex-1 items-center rounded-full border bg-stone-50 px-4 ${
                      errors.amount ? "border-red-600" : "border-border"
                    }`}
                  >
                    <span aria-hidden="true" className="text-muted">
                      {currency}
                    </span>
                    <input
                      aria-describedby={
                        errors.amount ? "donation-amount-error" : undefined
                      }
                      aria-invalid={Boolean(errors.amount)}
                      className="min-w-0 flex-1 bg-transparent py-2.5 pl-2 text-sm text-ink outline-none"
                      id="donation-amount"
                      inputMode="decimal"
                      min="0.01"
                      onChange={(event) => {
                        setAmount(event.target.value);
                        setSelectedPreset(null);
                        setErrors((current) => ({
                          ...current,
                          amount: undefined,
                        }));
                        clearSubmission();
                      }}
                      placeholder="0"
                      step="any"
                      type="number"
                      value={amount}
                    />
                  </div>
                  <label className="sr-only" htmlFor="donation-currency">
                    Currency
                  </label>
                  <select
                    className="rounded-full border border-border bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus-visible:ring-2 focus-visible:ring-primary"
                    id="donation-currency"
                    onChange={(event) => {
                      setCurrency(event.target.value);
                      clearSubmission();
                    }}
                    value={currency}
                  >
                    {siteConfig.donation.currencies.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.amount && (
                  <p
                    className="mt-1 text-sm text-red-700"
                    id="donation-amount-error"
                  >
                    {errors.amount}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className="sr-only">Donation frequency</legend>
                <div className="inline-flex overflow-hidden rounded-full border border-border">
                  {frequencies.map((option) => {
                    const selected = frequency === option;

                    return (
                      <button
                        aria-pressed={selected}
                        className={`border-r border-border px-4 py-2 text-sm transition duration-150 last:border-r-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          selected
                            ? "scale-[1.03] bg-primary-deep font-semibold text-white"
                            : "bg-white text-ink hover:bg-stone-50"
                        }`}
                        key={option}
                        onClick={() => {
                          setFrequency(option);
                          clearSubmission();
                        }}
                        type="button"
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="donation-name">
                    Your Name
                  </label>
                  <input
                    aria-describedby={
                      errors.name ? "donation-name-error" : undefined
                    }
                    aria-invalid={Boolean(errors.name)}
                    autoComplete="name"
                    className={`w-full rounded-full border px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary ${
                      errors.name ? "border-red-600" : "border-border"
                    }`}
                    id="donation-name"
                    onChange={(event) => {
                      setName(event.target.value);
                      setErrors((current) => ({
                        ...current,
                        name: undefined,
                      }));
                      clearSubmission();
                    }}
                    placeholder="Your Name"
                    value={name}
                  />
                  {errors.name && (
                    <p
                      className="mt-1 text-sm text-red-700"
                      id="donation-name-error"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="sr-only" htmlFor="donation-email">
                    Your Email
                  </label>
                  <input
                    aria-describedby={
                      errors.email ? "donation-email-error" : undefined
                    }
                    aria-invalid={Boolean(errors.email)}
                    autoComplete="email"
                    className={`w-full rounded-full border px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary ${
                      errors.email ? "border-red-600" : "border-border"
                    }`}
                    id="donation-email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrors((current) => ({
                        ...current,
                        email: undefined,
                      }));
                      clearSubmission();
                    }}
                    placeholder="Your Email"
                    type="email"
                    value={email}
                  />
                  {errors.email && (
                    <p
                      className="mt-1 text-sm text-red-700"
                      id="donation-email-error"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="donation-message">
                  Message
                </label>
                <textarea
                  className="min-h-24 w-full resize-y rounded-2xl border border-border px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-primary"
                  id="donation-message"
                  onChange={(event) => {
                    setMessage(event.target.value);
                    clearSubmission();
                  }}
                  placeholder="Message"
                  rows={3}
                  value={message}
                />
              </div>

              <div>
                <h3 className="mb-3 text-lg font-bold text-ink">
                  Raise Funds For Poor:
                </h3>
                <div
                  aria-label={`${progress.toFixed(0)}% of donation goal raised`}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={progress}
                  className="relative h-2 w-3/4 rounded-full bg-stone-100"
                  role="progressbar"
                >
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-ink shadow-sm"
                    style={{ left: `${progress}%` }}
                  >
                    {progress.toFixed(0)}%
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-8 gap-y-1 text-sm font-semibold text-primary-dark">
                  <p>
                    Raised: {formatAmount(siteConfig.donation.raised, currency)}
                  </p>
                  <p>
                    Goal: {formatAmount(siteConfig.donation.goal, currency)}
                  </p>
                </div>
              </div>

              {submitted ? (
                <p
                  aria-live="polite"
                  className="text-sm font-semibold text-green-800"
                  role="status"
                >
                  Thank you, your donation request was recorded (demo)
                </p>
              ) : (
                <button
                  className="self-start rounded-full bg-primary px-7 py-3 text-sm font-bold text-ink transition duration-150 hover:scale-[1.02] hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
                  type="submit"
                >
                  Donate Now
                </button>
              )}
            </form>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
