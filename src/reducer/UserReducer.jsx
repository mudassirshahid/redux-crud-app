import { createSlice } from "@reduxjs/toolkit";
import { userList } from "../utils/Data";

const loadUsers = () => {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : userList;
};

const userSlice = createSlice({
  name: "users",
  initialState: loadUsers(),
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state)); // Save to localStorage
    },
    updateUser: (state, action) => {
      const { id, name, email } = action.payload;
      const updatingUser = state.find((user) => user.id == id);
      if (updatingUser) {
        updatingUser.name = name;
        updatingUser.email = email;
        localStorage.setItem("users", JSON.stringify(state)); // Save to localStorage
      }
    },
    deleteUser: (state, action) => {
      const filteredUsers = state.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(filteredUsers)); // Save to localStorage
      return filteredUsers; // Return updated state
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
