import { useState } from "react";
import { useSelector } from "react-redux";

export default function ShareLink() {
  const [copied, setCopied] = useState(false);
  const {currentUser} = useSelector((state) => state.auth);

  // نسخ الرابط
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUser.shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className=" w-full h-10 bg-gray-800 px-4 rounded flex justify-center items-center gap-2">
      <span className="truncate border px-2 pb-1 rounded bg-white font-bold">{currentUser.userName}</span>
      <button
        onClick={handleCopy}
        className="text-sm text-blue-300 hover:text-blue-500 transition"
      >
        {copied ? "تم النسخ ✅" : "نسخ رابط المشاركة"}
      </button>
    </div>
  );
}
