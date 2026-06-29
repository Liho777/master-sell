"use client";

import { useState } from "react";

const MARKETPLACES = [
  {
    id: "Wildberries",
    label: "Wildberries",
    color: "#7B41FF",
    bg: "bg-violet-50",
    activeBg: "bg-violet-100",
    border: "border-violet-200",
    activeBorder: "border-violet-500",
    text: "text-violet-700",
  },
  {
    id: "Ozon",
    label: "Ozon",
    color: "#005BFF",
    bg: "bg-blue-50",
    activeBg: "bg-blue-100",
    border: "border-blue-200",
    activeBorder: "border-blue-500",
    text: "text-blue-700",
  },
  {
    id: "Яндекс.Маркет",
    label: "Яндекс.Маркет",
    color: "#FC3F1D",
    bg: "bg-red-50",
    activeBg: "bg-red-100",
    border: "border-red-200",
    activeBorder: "border-red-500",
    text: "text-red-700",
  },
  {
    id: "Авито",
    label: "Авито",
    color: "#14A800",
    bg: "bg-green-50",
    activeBg: "bg-green-100",
    border: "border-green-200",
    activeBorder: "border-green-500",
    text: "text-green-700",
  },
];

interface MarketplaceSelectorProps {
  name?: string;
  defaultValue?: string;
}

function MarketplaceLogo({ id }: { id: string }) {
  if (id === "Wildberries") {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8 shrink-0" fill="none">
        <rect width="48" height="48" rx="10" fill="#7B41FF" />
        <text x="24" y="31" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif">
          WB
        </text>
      </svg>
    );
  }
  if (id === "Ozon") {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8 shrink-0" fill="none">
        <rect width="48" height="48" rx="10" fill="#005BFF" />
        <text x="24" y="31" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial, sans-serif">
          O
        </text>
      </svg>
    );
  }
  if (id === "Яндекс.Маркет") {
    return (
      <svg viewBox="0 0 48 48" className="w-8 h-8 shrink-0" fill="none">
        <rect width="48" height="48" rx="10" fill="#FC3F1D" />
        <text x="24" y="31" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">
          ЯМ
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" className="w-8 h-8 shrink-0" fill="none">
      <rect width="48" height="48" rx="10" fill="#14A800" />
      <text x="24" y="31" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif">
        AV
      </text>
    </svg>
  );
}

export function MarketplaceSelector({
  name = "marketplace",
  defaultValue = "",
}: MarketplaceSelectorProps) {
  const [selected, setSelected] = useState(defaultValue);

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={selected} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {MARKETPLACES.map((mp) => {
          const isActive = selected === mp.id;
          return (
            <button
              key={mp.id}
              type="button"
              onClick={() => setSelected(mp.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition text-left ${
                isActive
                  ? `${mp.activeBg} ${mp.activeBorder}`
                  : `bg-white ${mp.border} hover:${mp.activeBg}`
              }`}
            >
              <MarketplaceLogo id={mp.id} />
              <span className={`text-sm font-semibold ${isActive ? mp.text : "text-slate-700"}`}>
                {mp.label}
              </span>
              {isActive && (
                <span className="ml-auto text-lg">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {!selected && (
        <p className="text-sm text-brand-700 font-medium">
          Выберите маркетплейс, чтобы ИИ адаптировал результат под требования площадки
        </p>
      )}
    </div>
  );
}
