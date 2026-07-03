import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import TranslatorCard from "../components/TranslatorCard";
import TranslationHistory from "../components/TranslationHistory";

function Home() {
  const [history, setHistory] = useState([]);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const fetchHistory = async () => {
    try {
      const res = await API.get("/history/");
      setHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-black"
          : "min-h-screen bg-linear-to-br from-indigo-900 via-purple-800 to-pink-700"
      }
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        
        <TranslatorCard
          onHistoryUpdate={fetchHistory}
        />

        <TranslationHistory
          history={history}
          onHistoryUpdate={fetchHistory}
        />
      </div>
    </div>
  );
}

export default Home;