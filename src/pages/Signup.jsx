import { useState } from "react";

import { signupUser } from "../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signupUser(formData);

      console.log(data);

      alert("Signup successful");
    } catch (error) {
      console.log(error);

      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
  
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          bg-[#1a1a1a]
          border border-gray-700
          rounded-2xl
          p-8
          space-y-6
        "
      >
  
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>
  
        <p className="text-gray-400 text-center text-sm">
          Join and start speed dating instantly
        </p>
  
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="
            w-full
            bg-[#111]
            border border-gray-700
            rounded-xl
            px-4 py-3
            outline-none
            focus:border-white
          "
        />
  
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="
            w-full
            bg-[#111]
            border border-gray-700
            rounded-xl
            px-4 py-3
            outline-none
            focus:border-white
          "
        />
  
        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="
            w-full
            bg-[#111]
            border border-gray-700
            rounded-xl
            px-4 py-3
            outline-none
            focus:border-white
          "
        />
  
        {/* Button */}
        <button
          type="submit"
          className="
            w-full
            bg-white
            text-black
            font-semibold
            py-3
            rounded-xl
            hover:scale-[1.02]
            transition
          "
        >
          Sign Up
        </button>
  
        {/* Footer */}
        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <span className="text-white cursor-pointer">
            Login
          </span>
        </p>
  
      </form>
  
    </div>
  );
};

export default Signup;