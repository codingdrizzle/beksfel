import axios from "axios";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { BsPencil } from "react-icons/bs";

const EditProfile = () => {
  const InputRef = useRef(null);

  const [image, setImage] = useState(" ");

  const [userData, setuserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
  });

  const [uploadProfile, setUploadProfile] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = () => {
    InputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file, file.name, file.lastModifiedDate);
    setImage((e.target.files[0]));

    // Check if a file is selected
    if (file) {
      // Check if the file type is either PNG or JPEG
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setImage(file);
        console.log("uploaded successfully");
      } else {
        console.log("Please upload a valid PNG or JPEG image.");
      }
    }
  };

  const UpdateProfile = async (event) => {
    event.preventDefault();
    // logic to update the user's profile with userData
    console.log("profile updated succesfully");

    try {
      // make API request to update the data
      const response = await axios.put("endpoint here", userData);

      //check if status === success(code:200), send success message
      console.log("profile updated succesfully", response.data);
    } catch (error) {
      // display error message if there is an error
      console.error("Error updating profile", error.message);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={UpdateProfile}
        className="flex flex-col justify-center items-center"
      >
        <h1 className="text-black uppercase text-sm mt-4 mb-2">Edit Your Profile</h1>

        <div
          onClick={handleImageUpload}
          className="relative w-24 h-24 rounded-full size-[120px] border-2 border-[#cccccc] p-1 m-2"
        >
          <label className=" flex text-center  p-2 capitalize">
            profile picture
          </label>
          {/* <Image src={''} alt='profile' /> */}
          <BsPencil size={20} className="absolute right-0  bottom-0" />
          <input
            className="form-input"
            type="file"
            ref={InputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="flex flex-col space-x-2 ">
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              className=" form-input "
              type="text"
              name="firstName"
              value={userData.firstName}
              placeholder="John"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              className="form-input"
              type="text"
              name="lastName"
              value={userData.lastName}
              placeholder="Doe"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={userData.email}
            placeholder="example@gmail.com"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label>User Name</label>
          <input
            className="form-input"
            type="text"
            name="userName"
            value={userData.userName}
            placeholder="Admin"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label>Contact Number</label>
          <input
            className="form-input"
            type="text"
            placeholder="0200-123-456"
          />
        </div>

        <button type="submit" className="auth-button" onClick={UpdateProfile}>
          Save changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
