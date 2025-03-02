import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../reducer/UserReducer";

const Home = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <div className="p-6 min-h-screen flex justify-center items-center">
      <div className="flex flex-col overflow-auto shadow-xl">
      <div className="flex sm:flex-row flex-col sm:gap-0 gap-5 justify-between my-3 items-center bg-black rounded-lg p-3">
          <h2 className="sm:text-3xl text-lg font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-lg px-4 py-2">CRUD APP</h2>
          <Link to="/create" className="sm:text-lg text-sm px-4 py-2 bg-emerald-500 rounded-lg font-bold text-white">
            Create +
          </Link>
        </div>
      <div className="w-full max-w-4xl overflow-x-auto shadow-lg">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100 text-left">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center">
                  <Link to={`/edit/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2 "
                  >
                    Delete
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      
    </div>
  );
};

export default Home;
