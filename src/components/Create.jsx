import React, { useState } from 'react'
import { addUser } from '../reducer/UserReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Create = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })

    const users = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
      const {name, value} = e.target
      setFormData((prev) => ({
        ...prev,
        [name]:value
      }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {name, email} = formData
        dispatch(addUser({id: users[users.length - 1].id + 1, name, email}))
        navigate('/')
    }
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 border rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-left text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-left text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Create
