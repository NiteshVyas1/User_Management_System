import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Load user data into form
  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
    }
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.patch("/user/profile", { fullName, email });

      // Refresh user context
      const res = await api.get("/auth/me");
      setUser(res.data);

      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.patch("/user/change-password", {
        oldPassword,
        newPassword,
      });

      setOldPassword("");
      setNewPassword("");

      alert("Password updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="p-6 text-center text-xl">
        No user found. Redirecting...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>

      {/* Profile Update */}
      <div className="bg-white shadow p-6 rounded mb-8">
        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

        <form onSubmit={updateProfile}>
          <input
            className="w-full border p-2 mb-3 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
          />

          <input
            className="w-full border p-2 mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white shadow p-6 rounded">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>

        <form onSubmit={changePassword}>
          <input
            type="password"
            className="w-full border p-2 mb-3 rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Current Password"
            required
          />

          <input
            type="password"
            className="w-full border p-2 mb-3 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
          />

          <button
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
