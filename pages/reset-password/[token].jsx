import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import Loader from '../../src/commons/Loader'
import resetPassword from '../../src/assets/reset-password.svg'
import { ResetPasswordLink } from '../../src/api'
import { useAlert } from '../../src/hooks/useCustomAlert'
import DecodeToken from '../../src/utils/decode-token'
import { ResetPasswordSchema, validateInput } from '../../src/utils/input-validator'

const Forgot = () => {
    const [processing, setProcessing] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [viewPassword, setViewPassword] = useState(false);
    const [identityUserFromSlug, setIdentityUserFromSlug] = useState('');
    const [identityUser, setIdentityUser] = useState('');



    const { showAlert } = useAlert()
    const router = useRouter()

    useEffect(() => {
        const { query } = router;
        const queryTokenData = DecodeToken(query.token)
        setIdentityUserFromSlug(queryTokenData.email)
        setIdentityUser(localStorage.getItem('identityUser'))
    }, [router])

    const handlePasswordReset = async (event) => {
        event.preventDefault()

        const errorMessage = validateInput(ResetPasswordSchema, {newPassword, confirmNewPassword})
        if (errorMessage !== null) return showAlert(errorMessage, 'error')

        if (identityUser === identityUserFromSlug) {
            setProcessing(true)
            const response = await ResetPasswordLink(identityUserFromSlug, newPassword);

            if (response.code === 200) {
                setProcessing(false);
                localStorage.removeItem('identityUser')
                showAlert('Password reset successful', 'success');
                return router.push('/');
            }
            setProcessing(false);
            return showAlert(response.message, 'error');
        } else return showAlert('Failed to identify user', 'error')
    }

    return (
        <div className="flex flex-col p-10 justify-center items-center sm:shadow-auth-form-shadow-1 w-auto min-w-[40%] h-auto min-h-[300px] rounded-lg">
            <Image src={resetPassword} alt='verify-account-image' width={400} />
            <h2 className="text-2xl py-1 font-semibold leading-[2] text-[#181818]">Reset Your Password</h2>
            <p className="w-[75%] text-sm leading-6 text-center tracking-[0.25px] my-4">You can now reset your password by setting a new password below.</p>

            <form className='flex flex-col justify-center items-center'>
                <div className='relative'>
                    <input className='form-input' type={viewPassword ? 'text' : 'password'} placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)} />
                    <span className='absolute top-[40%] right-3 text-base' onClick={() => setViewPassword(prev => !prev)}>{viewPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>
                </div>
                <div className='relative'>
                    <input className='form-input' type={viewPassword ? 'text' : 'password'} placeholder='Confirm Password' onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    <span className='absolute top-[40%] right-3 text-base' onClick={() => setViewPassword(prev => !prev)}>{viewPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>
                </div>
                <button type='submit' className="auth-button" style={{ marginTop: 20 }} onClick={handlePasswordReset} >{processing ? <Loader /> : 'Reset Password'}</button>
            </form >
        </div >
    );
};

export default Forgot;