// edit-profile.js

import React, { useState } from 'react';

const EditProfile = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log('File :',selectedFile)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // TODO: Implement the logic to upload the file to the server
    // and update the user's profile with the new image.
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Profile Picture:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
