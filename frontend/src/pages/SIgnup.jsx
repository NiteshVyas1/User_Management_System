import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup(){
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const [role,setRole] = useState("user");
  const navigate = useNavigate();

  const handleSignup = async(e)=>{
    e.preventDefault();

    if(!fullName || !email || !password){
      return toast.error("All fields required");
    }

    if(!email.includes("@")){
      return toast.error("Invalid email");
    }

    if(password.length < 6){
      return toast.error("Password must be atleast 6 chars");
    }

    if(password !== confirm){
      return toast.error("Passwords do not match");
    }

    try{
      await api.post("/auth/signup",{ fullName,email,password,role });
      toast.success("Signup success");
      navigate("/login");
    }catch(err){
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return(
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input className="w-full border p-2 mb-3" placeholder="Full Name"
          value={fullName} onChange={e=>setFullName(e.target.value)} />

        <input className="w-full border p-2 mb-3" placeholder="Email"
          value={email} onChange={e=>setEmail(e.target.value)} />

        <input className="w-full border p-2 mb-3" placeholder="Password" type="password"
          value={password} onChange={e=>setPassword(e.target.value)} />

        <input className="w-full border p-2 mb-3" placeholder="Confirm Password" type="password"
          value={confirm} onChange={e=>setConfirm(e.target.value)} />

        <div className="mb-3">
          <label className="font-semibold mr-3">Register as:</label>
          <select className="border p-2 rounded" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Signup
        </button>

        <p className="text-center mt-3 text-sm">
          Already have an account?
          <Link to="/login" className="text-blue-600"> Login</Link>
        </p>
      </form>
    </div>
  );
}
