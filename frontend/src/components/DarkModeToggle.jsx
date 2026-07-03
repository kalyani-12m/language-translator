import { FaMoon, FaSun } from "react-icons/fa";

function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="
        fixed
        top-5
        right-5
        p-3
        rounded-full
        bg-white/10
        backdrop-blur-lg
        border
        border-white/20
        shadow-lg
        hover:scale-110
        transition
      "
    >
      {darkMode ? (
        <FaSun className="text-yellow-300 text-xl" />
      ) : (
        <FaMoon className="text-white text-xl" />
      )}
    </button>
  );
}

export default DarkModeToggle;