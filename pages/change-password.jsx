import React, { useState } from "react";
import Layout from "../src/components/Layout";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePassword = async () => {
    // Perform additional client-side validation if needed
    if (newPassword === confirmPassword) {
      // Trigger password change process
      setIsChanging(true);

      try {
        // Simulate an API call for password change (replace with actual API call)
        const response = await fetch("/api/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        });

        if (response.ok) {
          // Password changed successfully
          alert("Password changed successfully.");
        } else {
          // Handle server-side errors
          const errorMessage = await response.text();
          alert(`Password change failed: ${errorMessage}`);
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error.message);
      } finally {
        setIsChanging(false);
      }
    } else {
      alert("New password and confirm password must match.");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center m-4 pt-4">
        <h2 className="uppercase m-2">Change Password</h2>
        <label>
          Current Password:
          <input
            className="form-input"
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder=" enter current password"
            required
          />
        </label>
        <label>
          New Password:
          <input
            className="form-input"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder=" enter new password"
            required
          />
        </label>
        <label>
          Confirm New Password:
          <input
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder=" confirm new password"
            required
          />
        </label>
        <button
          className="auth-button"
          onClick={handleChangePassword}
          disabled={isChanging}
        >
          {isChanging ? "Changing..." : "Change Password"}
        </button>
      </div>
    </Layout>
  );
};

export default ChangePassword;
