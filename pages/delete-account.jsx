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
    
    <div className="flex flex-col items-start m-4 pt-10">
              <h1 className="text-black uppercase text-2xl mt-4 mb-2">
Delete Account</h1>
      <p>
        To delete your account, please enter <strong>delete</strong> below:
      </p>
      <input
        className=" form-input"
        type="email"
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
