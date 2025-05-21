"use client"
import { useEffect } from "react";

const UnderWork = () => {
  // Optional: scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-10">
      <div className="max-w-xl text-center animate-fadeIn space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white">
          🚧 Page Under Construction
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          We're building something amazing for you! This page is currently under inactive development.
          <span className="text-base text-slate-400"> New features and updates will never be available because i ain't got any ideas as to what to add in this page</span>.
        </p>
        <ul className="text-left dark:text-gray-300 list-disc list-inside space-y-2">
          <li>Dark mode support <span className="italic text-gray-400">(Yep dark mode)</span></li>
          <li>Fully responsive layout <span className="italic text-gray-400">(which already is)</span></li>
          <li>Optimized performance <span className="italic text-gray-400">(idk about other)</span></li>
          <li>Interactive components <span className="italic text-gray-400">(🙂🙂🙂)</span></li>
        </ul>
        <p className="text-gray-500 dark:text-gray-400 italic">
          Last updated: May 21, 2025
        </p>

        <button
          onClick={() => window.history.back()}
          className="inline-block bg-[linear-gradient(45deg,#201c42,#0c163f,#0f1938,#1e184b)] border border-[#1d2753] cursor-pointer rounded-md py-1.5 px-3 gap-3 items-center hover:bg-[linear-gradient(180deg,#201c42,#0c163f,#0f1938,#1e184b)]"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default UnderWork;
