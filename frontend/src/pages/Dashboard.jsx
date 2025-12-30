import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Dashboard(){
  const { user,setUser } = useAuth();

  const logout = async()=>{
    await api.post("/auth/logout");
    setUser(null);
  };

  return(
    <div className="p-6">
      <h2 className="text-2xl font-bold">Welcome {user.fullName}</h2>
      <p>Role: {user.role}</p>

      <div className="mt-4 flex gap-4">
        <Link className="bg-blue-600 text-white px-4 py-2 rounded" to="/profile">
          Profile
        </Link>

        {user.role==="admin" && (
          <Link className="bg-purple-600 text-white px-4 py-2 rounded" to="/admin">
            Admin Dashboard
          </Link>
        )}

        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
