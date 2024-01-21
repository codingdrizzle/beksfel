import axios from "axios";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { BsPencil } from "react-icons/bs";
import FaUserAlt from "react-icons/fa";
import Layout from "../src/components/Layout";

const EditProfile = () => {
  const InputRef = useRef(null);

  // ------changes
  const [imgUrl, setImgUrl] = useState("");

  const handleFileInput = () => {
    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(document.getElementById("file_input").files[0]);
  };

  // ----------changes

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
    setImage(e.target.files[0]);

    // Check if a file is selected
    if (file) {
      // Check if the file type is either PNG or JPEG
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg " ||
        file.type === "image/svg" ||
        file.type === "image/gif "
      ) {
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
    <Layout>
      <form
        onSubmit={UpdateProfile}
        className="flex flex-col justify-center items-center"
      >
        <h1 className="text-black uppercase text-sm mt-4 mb-2">
          Edit Your Profile
        </h1>

        <div className='w-full flex items-center space-x-6 px-5 py-4'>
        
           <Image src={"https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" } alt="" width={150} height={150} className=' rounded-full' /> : <FaUserAlt className='w-20 h-20' />
        
        <div className="flex flex-col space-y-1">
            <input id="file_input" type="file" accept='image.*' hidden onChange={handleFileInput} />
            <label className="text-sm font-medium cursor-pointer text-gray-900 px-3 py-2 rounded-lg" htmlFor="file_input">Choose File</label>
            <label className="text-sm font-medium" htmlFor="file_input">No file chosen</label>
        </div>
    </div>
       
          <div className="flex flex-col space-y-1">
            <input
              id="file_input"
              type="file"
              accept="image.*"
              hidden
              onChange={handleFileInput}
            />
            <label
              className="text-sm font-medium cursor-pointer text-gray-900 px-3 py-2 rounded-lg"
              htmlFor="file_input"
            >
              Choose File
            </label>
            <label className="text-sm font-medium" htmlFor="file_input">
              No file chosen
            </label>
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
    </Layout>
  );
};

export default EditProfile;
