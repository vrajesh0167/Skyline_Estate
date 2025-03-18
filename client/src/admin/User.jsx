import React, { useEffect, useState } from "react";

function User(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from API (replace with your actual API endpoint)
        fetch("/api/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="py-2 px-4">Avatar</th>
                            <th className="py-2 px-4">Username</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Role</th>
                            <th className="py-2 px-4">Verified</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b">
                                <td className="py-2 px-4">
                                    <img
                                        src={user.avatar}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full border"
                                    />
                                </td>
                                <td className="py-2 px-4">{user.username}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4 font-semibold text-blue-600">{user.role}</td>
                                <td className="py-2 px-4">
                                    {user.isEmailVerified ? (
                                        <span className="text-green-500">Verified</span>
                                    ) : (
                                        <span className="text-red-500">Not Verified</span>
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User;