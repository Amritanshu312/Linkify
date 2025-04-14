"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RedirectOriginalUrl = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attemptedAt, setAttemptedAt] = useState(null);
  const [status, setStatus] = useState("Initializing...");

  const fetchURL = async () => {
    if (!id) return;

    setLoading(true);
    setStatus("Fetching redirect info...");
    setError(null);
    setAttemptedAt(new Date().toLocaleString());

    try {
      const response = await fetch(`/api/user/links/info?_url_=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ show: ["url"] }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Server returned an error.");
      }

      if (data?.success && data?.data?.url) {
        setStatus("Redirecting...");
        router.push(data.data.url);
      } else {
        throw new Error(data?.message || "URL not found.");
      }
    } catch (err) {
      setStatus("Failed to redirect.");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchURL();
  }, [id, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-[#a7b4b6] px-4 text-center">
      <div className="w-full max-w-xl bg-[#03091d38] border-2 border-[#181f3ed1] rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold">🔗 Redirecting...</h1>

        <p><strong>Shortlink ID:</strong> <code className="text-[#76c2d6]">{id || "N/A"}</code></p>

        <p><strong>Status:</strong> {status}</p>

        {attemptedAt && (
          <p><strong>Attempted At:</strong> {attemptedAt}</p>
        )}

        {loading ? (
          <div className="flex flex-col items-center">
            <div className="loader w-6 h-6 border-4 border-t-transparent border-[#a7b4b6] rounded-full animate-spin mb-2"></div>
            <span>Redirecting to your destination...</span>
          </div>
        ) : error ? (
          <div className="space-y-3">
            <p className="text-red-400 font-medium">🚫 Error: {error}</p>
            <button
              onClick={fetchURL}
              className="px-4 py-2 bg-[#1f2937] hover:bg-[#374151] transition rounded-lg border border-gray-600"
            >
              Retry
            </button>
          </div>
        ) : (
          <p>✅ Redirect successful.</p>
        )}
      </div>
    </div>
  );
};

export default RedirectOriginalUrl;
