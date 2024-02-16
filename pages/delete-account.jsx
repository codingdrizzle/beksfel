import React, { useState } from "react";
import Layout from "../src/components/Layout";
import axios from "axios";

const DeleteAccount = () => {
  const [email, setEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [successfulDeletion, setSuccessfulDeletion] = useState(" ");

  const handleConfirmationChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.delete(`/api/users/${email}`); // Adjust the URL to match your backend endpoint
      if (email.toLowerCase() === `${email}`) {
        setIsDeleting(true);

        // delete after 3-seconds
        setTimeout(() => {
          setIsDeleting(false);
        }, 3000);
      }
      setSuccessfulDeletion(response.data.message); // Assuming your backend sends a message upon successful deletion
    } catch (error) {
      console.log("Account deletion was unsuccessful ", error);
    }
  };

  return (
    <Layout>
      <div className="w-full flex flex-col justify-center align-items-center  m-4 pt-10">
        <h1 className="w-fit text-black uppercase text-2xl mt-4 mb-2 p-1">
          Delete Account
        </h1>
        <p className=" flex w-fit">
          To delete your account, please enter your <strong> email </strong>{" "}
          below:
        </p>

        <input
          className=" form-input "
          type="email"
          placeholder="Enter user email"
          value={email}
          onChange={handleConfirmationChange}
        />
        <p className="flex w-fit">
          {" "}
          NB: Your account will be deactivated for the next 45 days{" "}
        </p>

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
