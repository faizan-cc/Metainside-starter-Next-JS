"use client";

import { MarketDataDashboard } from "@/components/MarketDataDashboard";

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <MarketDataDashboard />
      </main>
    </div>
  );
}