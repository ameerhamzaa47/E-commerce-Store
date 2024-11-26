import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      Navigate('/')
    }
  }, [])

  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setFormData({ name: "", email: "", password: "" });
    setError("");
  };

  function sendData() {
    localStorage.setItem('user-info', JSON.stringify(formData))
    Navigate('/')
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Register</h2>

      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-2 w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your name" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-2 w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your email" />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-2 w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your password" />
        </div>

        <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={sendData} >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-600 hover:text-indigo-700">
          Login here
        </a>
      </p>
    </div>
  );
};

export default Register;