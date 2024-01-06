import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState(' ')
    const [confirmPassword, setConfirmPassword] = useState(' ')
    const [passwordsMatch, setPasswordsMatch] = useState(true);


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // Check if the passwords match when the password is changed
        setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // Check if the passwords match when the confirmation password is changed
        setPasswordsMatch(e.target.value === password);
    };



    const ResetPassword = (event) => {
        event.preventDefault()

    }


    return (
        <div>
            <h1 className='capitalize text-2xl text-[#000] p-1'>Reset your password</h1>
            <form className='flex flex-col'>
                <div className='relative '>
                    <input className="form-input" type={showPassword ? 'text' : 'password'} value={password} placeholder="Enter new password"
                        onChange={handlePasswordChange}
                    />
                    <span className='absolute top-[40%] right-3 text-base'
                        onClick={() => setShowPassword(previous => !previous)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />} </span>
                </div>
                <div className='relative '>
                    <input className="form-input" type={showPassword ? 'text' : 'password'} value={confirmPassword} placeholder="Confirm new password"
                        onChange={handleConfirmPasswordChange}
                    />
                    <span className='absolute top-[40%] right-3 text-base'
                        onClick={() => setShowPassword(previous => !previous)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />} </span>
                </div>
                {
                    passwordsMatch ? " " : <p style={{ color: 'red' }}>Passwords do not match</p>

                }

                <button className="auth-button" onClick={ResetPassword}>Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPassword
