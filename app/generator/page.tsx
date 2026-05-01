"use client";

import { useEffect, useState } from "react";

export default function GeneratorPage() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState(false);

  // ✅ No basePath prefix — Next.js serves static files from the right path
  const generatorUrl = "/generator/index.html";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading Generator...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a]">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-5xl mb-4">🚀</div>
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            MVP Website Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create beautiful e-commerce websites with bilingual support and
            WhatsApp integration.
          </p>
          <a
            href={generatorUrl}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Open Generator
          </a>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={generatorUrl}
      className="w-full h-screen border-0"
      title="MVP Website Generator"
      onError={() => setError(true)}
    />
  );
}
