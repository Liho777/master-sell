"use client";

import { useState } from "react";

interface CopyTextButtonProps {
  text: string;
  label?: string;
}

export function CopyTextButton({ text, label = "Копировать" }: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      className="text-xs font-medium text-brand-700 hover:text-brand-800 disabled:text-slate-400 transition"
    >
      {copied ? "Скопировано ✓" : label}
    </button>
  );
}
