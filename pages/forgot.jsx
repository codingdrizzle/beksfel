import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Loader from '../src/commons/Loader'
import forgotPassword from '../src/assets/forgot-password.svg'
import { SendResetPasswordLink } from '../src/api'
import { useAlert } from '../src/hooks/useCustomAlert'
import DecodeToken from '../src/utils/decode-token'
import { ForgotPasswordSchema, validateInput } from '../src/utils/input-validator'

const Forgot = () => {
    const [processing, setProcessing] = useState(false)
    const [email, setEmail] = useState('')

    const { showAlert } = useAlert()

    const handleSendLink = async (event) => {
        event.preventDefault()

        const errorMessage = validateInput(ForgotPasswordSchema, { email })
        if (errorMessage !== null) return showAlert(errorMessage, 'error')

        setProcessing(true)
        const response = await SendResetPasswordLink(email);

        if (response.code === 200) {
            const tokenData = DecodeToken(response.data);
            localStorage.setItem('identityUser', tokenData.email);
            setProcessing(false);
            return showAlert('Check your email for further instructions on resetting your password.', 'success');
        }
        setProcessing(false);
        return showAlert(response.message, 'error');

    }

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="flex flex-col p-10 justify-center items-center sm:shadow-auth-form-shadow-1 w-auto min-w-[40%] h-auto min-h-[500px] max-h-full rounded-lg">
                <Image src={forgotPassword} alt='verify-account-image' width={400} />
                <h2 className="text-2xl py-1 font-semibold leading-[2] text-[#181818]">Forgot Your Password?</h2>
                <p className="w-[75%] text-sm leading-6 text-center tracking-[0.25px] my-4">Enter your registered email address in the box below to receive a password reset link.</p>

                <form className='flex flex-col justify-center items-center'>
                    <input className='form-input' type="text" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                    <span className='text-sm'>Remembered password? <Link href={'/'} className='underline'>Login</Link></span>
                    <button type='submit' className="auth-button" onClick={handleSendLink} >{processing ? <Loader /> : 'Reset Link'}</button>
                </form >
            </div >
        </div >
    );
};

export default Forgot;