const ContinueCard = ({ onYes, onNo }) => {
    return (
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">
          Time’s up ⏳
        </h1>
  
        <p className="text-gray-400 mb-6">
          Do you want to continue chatting?
        </p>
  
        <div className="flex gap-4 justify-center">
          <button
            onClick={onYes}
            className="bg-white text-black px-6 py-2 rounded-xl"
          >
            Yes
          </button>
  
          <button
            onClick={onNo}
            className="bg-gray-700 px-6 py-2 rounded-xl"
          >
            No
          </button>
        </div>
      </div>
    );
  };
  
  export default ContinueCard;