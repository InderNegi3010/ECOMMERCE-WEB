import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message || "Invalid login credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md ">
        <h1 className="text-2xl font-bold">Admin panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mt-2 mb-4 min-w-72">
            <p className="text-sm font-medium mb-2 text-gray-700">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full rounded-md px-3 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-4 min-w-72">
            <p className="text-sm font-medium mb-2 text-gray-700">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full rounded-md px-3 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
