import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../reducer/UserReducer";

const Update = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const existingUser = users.find((user) => user.id == id);

  // Handle case where user is not found
  if (!existingUser) {
    return <p className="text-2xl font-semiboldbold text-center text-red-500 bg-white p-14 shadow-lg rounded-lg">User not found</p>;
  }

  const [updateName, setUpdateName] = useState(existingUser.name);
  const [updateEmail, setUpdateEmail] = useState(existingUser.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Sync localStorage on mount
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        id: id,
        name: updateName,
        email: updateEmail,
      })
    );

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    navigate("/"); // Navigate back to home
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 border rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Update User</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-left text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-left text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
 