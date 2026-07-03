function LanguageSelector({
  label,
  value,
  onChange,
  languages,
}) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-white">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          bg-indigo-900
          text-white
          border
          border-slate-700
          shadow-lg
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
          transition
          duration-300
        "
      >
        {languages.map((language) => (
          <option
            key={language}
            value={language}
            className="bg-blue-900 text-white"
          >
            {language}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;