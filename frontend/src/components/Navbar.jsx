import { FaLanguage, FaMoon, FaSun } from "react-icons/fa";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <FaLanguage className="text-3xl text-white" />

          <h1 className="text-2xl font-bold text-white">
            AI Language Translator
          </h1>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
            p-3
            rounded-full
            bg-white/10
            border
            border-white/20
            hover:scale-110
            transition
            duration-300
          "
        >
          {darkMode ? (
            <FaSun className="text-yellow-300 text-xl" />
          ) : (
            <FaMoon className="text-white text-xl" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;