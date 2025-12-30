import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [users,setUsers] = useState([]);
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [loading,setLoading] = useState(false);
  const [actionLoading,setActionLoading] = useState(false);

  const fetchUsers = async()=>{
    try{
      setLoading(true);
      const res = await api.get(`/admin/users?page=${page}&limit=10`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    }catch(err){
      toast.error("Failed to load users");
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchUsers();
  },[page]);

  const toggleStatus = async(id, action)=>{
    const confirmAction = window.confirm(
      `Are you sure you want to ${action} this user?`
    );

    if(!confirmAction) return;

    try{
      setActionLoading(true);
      await api.patch(`/admin/user/${id}/${action}`);
      toast.success(`User ${action}d successfully`);
      fetchUsers();
    }catch(err){
      toast.error("Action failed");
    }finally{
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

      {/* Loading */}
      {loading && (
        <div className="text-center text-xl">Loading users...</div>
      )}

      {/* Users Table */}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Full Name</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map(u=>(
                <tr key={u._id} className="border text-center">
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">{u.fullName}</td>
                  <td className="p-2 border capitalize">{u.role}</td>
                  <td className={`p-2 border font-semibold ${
                    u.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {u.status}
                  </td>

                  <td className="p-2 border">
                    {u.status === "inactive" ? (
                      <button
                        disabled={actionLoading}
                        onClick={()=>toggleStatus(u._id,"activate")}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:bg-gray-400"
                      >
                        Activate
                      </button>
                    ):(
                      <button
                        disabled={actionLoading}
                        onClick={()=>toggleStatus(u._id,"deactivate")}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:bg-gray-400"
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-3">
        <button
          disabled={page === 1}
          onClick={()=>setPage(page - 1)}
          className="bg-gray-800 text-white px-3 py-1 rounded disabled:bg-gray-400"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={()=>setPage(page + 1)}
          className="bg-gray-800 text-white px-3 py-1 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
