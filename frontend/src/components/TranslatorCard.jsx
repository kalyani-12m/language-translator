import { useState, useEffect } from "react";
import {
  FaExchangeAlt,
  FaCopy,
  FaVolumeUp,
} from "react-icons/fa";

import API from "../services/api";
import LoadingSpinner from "./LoadingSpinner";
import LanguageSelector from "./LanguageSelector";

const languages = [
  "Auto Detect",
  "English",
  "Telugu",
  "Hindi",
  "Tamil",
  "French",
  "German",
  "Spanish",
  "Japanese",
  "Chinese",
];

function TranslatorCard({ onHistoryUpdate }) {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");

  const [sourceLanguage, setSourceLanguage] =
    useState("Auto Detect");

  const [targetLanguage, setTargetLanguage] =
    useState("Telugu");

  const [loading, setLoading] = useState(false);

  // Load available voices
  useEffect(() => {
    speechSynthesis.getVoices();

    speechSynthesis.onvoiceschanged = () => {
      speechSynthesis.getVoices();
    };
  }, []);

  const translateText = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const res = await API.post("/translate/", {
        text,
        source_language: sourceLanguage,
        target_language: targetLanguage,
      });

      setTranslated(res.data.translated_text);

      if (onHistoryUpdate) {
        onHistoryUpdate();
      }
    } catch (error) {
      console.error(error);
      alert("Translation failed");
    } finally {
      setLoading(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(translated);
    alert("Copied!");
  };

  const speakText = () => {
    if (!translated || !translated.trim()) {
      alert("No translated text available");
      return;
    }

    // Stop any currently speaking text
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      translated
    );

    const languageMap = {
      English: "en-US",
      Telugu: "te-IN",
      Hindi: "hi-IN",
      Tamil: "ta-IN",
      French: "fr-FR",
      German: "de-DE",
      Spanish: "es-ES",
      Japanese: "ja-JP",
      Chinese: "zh-CN",
    };

    utterance.lang =
      languageMap[targetLanguage] || "en-US";

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();

    const matchingVoice = voices.find(
      (voice) =>
        voice.lang &&
        voice.lang.startsWith(
          utterance.lang.split("-")[0]
        )
    );

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      console.log("Speech started");
    };

    utterance.onend = () => {
      console.log("Speech finished");
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event);
      alert("Unable to play audio");
    };

    window.speechSynthesis.speak(utterance);
  };

  const swapLanguages = () => {
    if (sourceLanguage === "Auto Detect") return;

    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  return (
    <div
      className="
      max-w-4xl
      mx-auto
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      rounded-3xl
      shadow-2xl
      p-8
    "
    >
      <div className="grid md:grid-cols-2 gap-4">
        <LanguageSelector
          label="Source Language"
          value={sourceLanguage}
          onChange={setSourceLanguage}
          languages={languages}
        />

        <LanguageSelector
          label="Target Language"
          value={targetLanguage}
          onChange={setTargetLanguage}
          languages={languages}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={swapLanguages}
          className="
            mt-5
            p-3
            rounded-full
            bg-purple-600
            hover:bg-purple-700
            transition
          "
        >
          <FaExchangeAlt className="text-white" />
        </button>
      </div>

      <textarea
        rows="3"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Type text to translate..."
        className="
          w-full
          mt-5
          p-4
          rounded-2xl
          bg-purple-900
          text-white
          placeholder-gray-400
          border
          border-slate-700
          outline-none
          focus:ring-2
          focus:ring-purple-500
        "
      />

      <button
        onClick={translateText}
        className="
          mt-5
          w-full
          py-4
          rounded-2xl
          font-bold
          text-white
          bg-linear-to-r
          from-purple-600
          to-pink-600
          hover:scale-105
          transition
          duration-300
        "
      >
        Translate
      </button>

      {loading && <LoadingSpinner />}

      {translated && (
        <div
          className="
            mt-6
            p-5
            rounded-2xl
            bg-black/20
            border
            border-white/20
          "
        >
          <h3 className="text-white font-semibold mb-3">
            Translation
          </h3>

          <p className="text-white text-lg">
            {translated}
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={copyText}
              className="p-2 rounded-lg bg-white/10"
            >
              <FaCopy className="text-white" />
            </button>

            <button
              onClick={speakText}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
            >
              <FaVolumeUp className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TranslatorCard;