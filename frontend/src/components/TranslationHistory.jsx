import API from "../services/api";

function TranslationHistory({
  history,
  onHistoryUpdate,
}) {
  const deleteHistory = async () => {
    const confirmDelete = window.confirm(
      "Delete all translation history?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(
        "/history/delete/"
      );

      onHistoryUpdate();
    } catch (error) {
      console.error(error);
      alert("Failed to delete history");
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-white">
          Translation History
        </h2>

        <button
          onClick={deleteHistory}
          className="
            px-4
            py-2
            bg-red-600
            hover:bg-red-700
            text-white
            rounded-lg
            transition
          "
        >
          Delete All
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="
              bg-white/10
              backdrop-blur-lg
              border
              border-white/20
              rounded-2xl
              p-4
            "
          >
            <p className="text-purple-300 font-semibold">
              {item.source_language}
              {" → "}
              {item.target_language}
            </p>

            <p className="text-white mt-2">
              {item.source_text}
            </p>

            <p className="text-green-300 mt-2">
              {item.translated_text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TranslationHistory;