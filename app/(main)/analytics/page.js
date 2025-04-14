"use client"

import { useEffect } from "react";

const AnalyticsPage = () => {

  useEffect(() => {
    const referrer = document.referrer;
    console.log("User came from:", referrer);

    // Optionally send to your backend
    if (referrer) {
      fetch("/api/log-referrer", {
        method: "POST",
        body: JSON.stringify({ referrer }),
        headers: { "Content-Type": "application/json" },
      });
    }
  }, []);


  return (
    <div className="min-[680px]:px-12 min-[680px]:py-6 flex flex-col gap-4">
      dfgsdfg
    </div>
  )
}

export default AnalyticsPage