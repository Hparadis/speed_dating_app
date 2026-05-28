import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/matches/${user._id}`
      );

      setMatches(res.data);
    };

    fetchMatches();
  }, []);

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">

      <div className="max-w-md mx-auto bg-[#1a1a1a] rounded-3xl p-6 border border-gray-700">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl">

            {user.username[0].toUpperCase()}

          </div>

          <div>

            <h2 className="text-xl font-bold">

              {user.username}

            </h2>

            <p className="text-gray-400">

              {user.email}

            </p>

          </div>

        </div>

        <button
          onClick={logout}
          className="mt-6 w-full bg-red-600 rounded-xl p-3"
        >
          Logout
        </button>

      </div>

    </div>

  );
};

export default Profile;