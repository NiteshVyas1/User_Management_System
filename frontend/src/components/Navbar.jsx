import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <span className="font-bold text-lg">User Management</span>

      {user && (
        <div className="flex gap-4 items-center">
          <span>{user.fullName} ({user.role})</span>

          <Link to="/" className="hover:text-blue-300">Dashboard</Link>

          <Link to="/profile" className="hover:text-blue-300">Profile</Link>

          {user.role === "admin" && (
            <Link to="/admin" className="hover:text-blue-300">Admin</Link>
          )}

          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
