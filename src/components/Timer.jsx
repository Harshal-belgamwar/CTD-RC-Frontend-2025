import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_API_URL;

function EventTimer() {
  const navigate = useNavigate();
  const [remainingMs, setRemainingMs] = useState(null);

  useEffect(() => {
    // Fetch once on mount
    axios
      .get(`${BACKEND_URL}/time`, { withCredentials: true })
      .then((res) => {
        setRemainingMs(res.data.remainingMs); // use raw milliseconds
      })
      .catch((err) => console.error("Error fetching event time:", err));
  }, []);

  useEffect(() => {
    if (remainingMs === null) return;

    if (remainingMs <= 0) {
    

      navigate("/results");
    }

    // Interval that ticks every second
    const interval = setInterval(() => {
      setRemainingMs((prev) => (prev > 0 ? prev - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingMs]);

  // Formatter (same as backend’s formatRemainingTime)
  const formatRemainingTime = (ms) => {
    if (ms <= 0) return "Event Ended";

    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60))%60;
    const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
    // const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return ` ${hours} : ${minutes} : ${seconds}`;
  };

  if (remainingMs === null) return <p>Loading...</p>;

  return (
    <div className="bg-[#CAFF33] text-black font-semibold rounded-full px-4 py-2 shadow-md hover:scale-105 transition-transform duration-200">
      <p>{formatRemainingTime(remainingMs)}</p>
    </div>
  );
}

export default EventTimer;
