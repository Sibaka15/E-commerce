import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
const UserManagement = () => {
  const users = [
    {
        _id:'123165',
      name: "Siva",
      email: "sibaka15@gmail.com",
      role: "admin",
    },
    {
        _id:'123165',
      name: "Siva",
      email: "sibaka15@gmail.com",
      role: "admin",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId,newRole) =>{
    console.log({id:userId,role:newRole});
    
  }

  const handleDeleteUser = (userId) =>{
    // console.log(userId);
    if(window.confirm('Are u Sure want to delete user ? ')){
        alert(userId)
    }
    
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="text-gray-700"> Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </div>
          <div className="mb-8">
            <label className="text-gray-700"> Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </div>
          <div className="mb-8">
            <label className="text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
          </div>
          <div className="mb-8">
            <label className="text-gray-700">Role</label>
            <select
              className="w-full border p-2"
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-sm uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              
                users.map((user,index)=>{
                    return(
                        <tr className="border-b  hover:bg-gray-50" key={index}>
                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">
                                <select value={user.role} onChange={(e)=>handleRoleChange(user._id,e.target.value)} 
                                    className="p-2 border rounded-lg"
                                    >
                                    <option value='customer'>Customer</option>
                                    <option value='admin'>Admin</option>
                                </select>
                            </td>
                            <td className="p-4 ">
                                <button onClick={()=>handleDeleteUser(user._id)} className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 hover:bg-red-600 rounded"> <MdDeleteForever /> <span>Delete</span></button>
                            </td>
                        </tr>
                    )
                })
              
            ) : (
              <tr>
                <td className="text-center p-4 " colSpan={4}>
                  {" "}
                  No User Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
