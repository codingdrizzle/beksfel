import React, { useState } from "react";
import Layout from "../src/components/Layout"

const DeleteAccount = () => {
  const [confirmation, setConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmationChange = (e) => {
    setConfirmation(e.target.value);
  };

  const handleDeleteAccount = (event) => {
    event.preventDefault();
    if (confirmation.toLowerCase() === "delete") {
      setIsDeleting(true);

      // delete after 3-~seconds
      setTimeout(() => {
        setIsDeleting(false);
      }, 3000);
    }
  };

  return (
    <Layout> 
    
    <div className="flex flex-col items-center m-4 pt-10">
      <h2 className=" uppercase">Delete Account</h2>
      <p>
        To delete your account, please enter <strong>delete</strong> below:
      </p>
      <input
        className=" form-input"
        type="text"
        value={confirmation}
        onChange={handleConfirmationChange}
      />
      <button
        className="auth-button"
        onClick={handleDeleteAccount}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Account"}
      </button>
    </div>
    </Layout>
  );
};

export default DeleteAccount;
