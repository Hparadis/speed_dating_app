const FindMatchCard = ({ onFindMatch, loading}) => {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Find Match
        </h1>
  
        <p className="text-gray-400 mb-6">
          Ready to meet someone new?
        </p>
  
        <button
          onClick={onFindMatch}
          className="
          w-full
          bg-white
          text-black
          rounded-xl
          p-3
          "
          >

          {loading
          ? "Searching..."
          : "Find Match"}

        </button>
      </div>
    );
  };
  
  export default FindMatchCard;