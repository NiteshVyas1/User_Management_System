import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loginRole,setLoginRole] = useState("user");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();

    if(!email || !password){
      return toast.error("Email & password required");
    }

    try{
      const res = await api.post("/auth/login",{email,password});
      setUser(res.data.user);
      toast.success("Login successful");

      if(loginRole === "admin") navigate("/admin");
      else navigate("/");
      
    }catch(err){
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return(
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input 
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input 
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        {/* <div className="mb-3">
          <label className="font-semibold mr-3">Login as:</label>
          <select 
            className="border p-2 rounded"
            value={loginRole}
            onChange={e=>setLoginRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}

        <button 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-center mt-3 text-sm">
          No account?
          <Link to="/signup" className="text-blue-600 ml-1">Signup</Link>
        </p>
      </form>
    </div>
  );
}
