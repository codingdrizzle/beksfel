import Image from "next/image";
import React, { useEffect, useState } from "react";
import FaUserAlt from "react-icons/fa";
import Layout from "../src/components/Layout";
import { validateInput } from '../src/utils/input-validator/validator'
import { EditProfileSchema } from '../src/utils/input-validator'
import { useAlert } from '../src/hooks/useCustomAlert'
import {EditUserProfile} from '../src/api'
import { useAtomValue } from "jotai";
import { authUser } from "../src/store";
import { useRouter } from "next/router";

const EditProfile = () => {
    const [selectedFile, setSelectedFile] = useState('');
    const [showImage, setShowImage] = useState('');
    const { showAlert } = useAlert()
    const router = useRouter()
    const user = useAtomValue(authUser)

    const readImage = () => {
        const reader = new FileReader();
        reader.onload = () => {
            setShowImage(reader.result);
        };
        reader.readAsDataURL(document.getElementById('file_input').files[0]);
    };

    const handleFileChange = (e) => {
        readImage()
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const formData = new FormData();
    formData.append('file', selectedFile);


    const [firstname, setFirstname] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        setFirstname(user.firstname)
        setSurname(user.surname)
        setEmail(user.email)
    }, [user])

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        const errorMessage = validateInput(EditProfileSchema, { firstname, surname, email })
        if (errorMessage) return showAlert(errorMessage, 'error');
        
        let data = {};
        
        if(firstname !== user.firstname) data.firstname = firstname;
        if(surname !== user.surname) data.surname = surname;
        if(email !== user.email) data.email = email;
        
        if(Object.keys(data).length === 0) return showAlert('No changes made to profile', 'warning');
        
        const response = await EditUserProfile(user._id, data);
        if(response.code === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('newUser');
            showAlert(response.message, 'success')
            return router.push('/');
        }
        return showAlert(response.message, 'error')
    }

    return (
        <Layout>
            <form
                className="flex flex-col justify-center items-start"
            >
                <h1 className="text-black uppercase text-2xl mt-4 mb-2">
                    Edit Your Profile
                </h1>

                {/*<div className='relative w-full flex justify-center my-10 items-center space-x-6 px-5 py-4'>
                    <div className="flex justify-center items-center w-[150px] h-[150px] aspect-auto object-contain rounded-full border-[1px] border-black object-contain">
                        <Image
                            src={showImage}
                            alt=" "
                            width={150}
                            height={150}
                            className="rounded-full"
                        />
                        {
                            !showImage &&
                            <div className="absolute bg-black/5 w-[inherit] h-[inherit] rounded-full flex justify-center items-center cursor-pointer hover:bg-black/30 text-black">
                                No Profile Picture
                            </div>
                        }
                    </div>
                    <div className="flex flex-col space-y-1">
                        <input id="file_input" type="file" accept='image.*' hidden onChange={handleFileChange} />
                        <label className="text-sm font-medium cursor-pointer bg-white text-gray-900 px-3 py-2 rounded-lg" htmlFor="file_input">Choose File</label>
                        <label className="text-sm font-medium" htmlFor="file_input">{selectedFile?.name || 'No file chosen'}</label>
                    </div>
                </div>*/}


                <div className="grid grid-cols-4 gap-5 ">
                    <div className="col-span-2 flex flex-col">
                        <input
                            className=" form-input "
                            type="text"
                            name="firstName"
                            value={firstname}
                            placeholder="Firstname"
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <input
                            className="form-input"
                            type="text"
                            name="Surname"
                            value={surname}
                            placeholder="Doe"
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>

                    <div className="col-span-4 flex flex-col">
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                <button type="submit" className="auth-button" onClick={handleProfileUpdate}>
                    Save changes
                </button>
            </form>
        </Layout>
    );
};

export default EditProfile;
