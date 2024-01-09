import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Loader from '../src/commons/Loader'
import verifyAccountImage from '../src/assets/verify-account.svg'
import DecodeToken from '../src/utils/decode-token'
import { Register, VerifyAccount } from '../src/api'
import { useAlert } from '../src/hooks/useCustomAlert'
import { validateInput, OtpInputSchema } from '../src/utils/input-validator'

const Verify = () => {
    const router = useRouter();
    const [processing, setProcessing] = useState(false)

    const length = 6;
    const inputs = Array(length).fill(null);
    const ref = useRef;
    const inputRefs = inputs.map(() => ref());

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1 && index < length - 1) {
            inputRefs[index + 1].current.focus();
        }
        //setOtp(value)
    };

    const handleKeyUp = (e, index) => {
        const value = e.target.value;
        if (e.keyCode === 8 && index > 0 && !value) {
            inputRefs[index - 1].current.focus();
        }
        setOtp(inputRefs.map(ref => ref.current.value).join(''))
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        if (pastedData.length === length) {
            pastedData.split('').forEach((char, index) => {
                if (inputRefs[index] && inputRefs[index].current) {
                    inputRefs[index].current.value = char;
                    if (index < length - 1) {
                        inputRefs[index + 1].current.focus();
                    }
                }
            });
        }
        setOtp(inputRefs.map(ref => ref.current.value).join(''))
    };

    const [otp, setOtp] = useState('')
    const [otpFromServer, setOtpFromServer] = useState('')
    const [newUserData, setNewUserData] = useState('')
    const [isVerified, setVerified] = useState(false)
    const { showAlert } = useAlert()

    useEffect(() => {
        const tokenData = DecodeToken(localStorage.getItem('newUserToken'))
        setOtpFromServer(tokenData.otp)
        const userData = JSON.parse(localStorage.getItem('newUserData'))
        setNewUserData(userData)
    }, [])

    const handleResend = async (event) => {
        event.preventDefault();
        const response = await VerifyAccount(newUserData.firstname, newUserData.email)

        if (response.code === 200) {
            return showAlert('We sent you a confirmation code to verify your account.', 'success')
        }
        return showAlert(response, 'error')
    }

    const handleConfirm = () => {
        const errorMessage = validateInput(OtpInputSchema, { otp })
        if (errorMessage !== null) return showAlert(errorMessage, 'error')
        if (otp === '') return { isConfirmed: false, message: 'Please enter your confirmation code' };
        if (Number(otp) != Number(otpFromServer)) return { isConfirmed: false, message: 'Incorrect code entered' };
    return { isConfirmed: true }
    }

    const handleUserRegistration = async (event) => {
        event.preventDefault();

        const confirmation = handleConfirm();
        if (!confirmation.isConfirmed) return showAlert(confirmation.message, 'error')

        setProcessing(true)
        const response = await Register(newUserData);

        if (response.code === 201) {
            setProcessing(false)
            showAlert(response.message, 'success')
            return setVerified(true)
        }
        setProcessing(false)
        showAlert(response.message, 'error')
        return router.push('/') 
    }

    const reRoute = (event) => {
        event.preventDefault()
        localStorage.removeItem('newUserData')
        localStorage.removeItem('newUserToken')
        return router.push('/')
    }

    return (
        <div className="flex w-full h-screen justify-center items-center">
        <div className="flex flex-col p-10 justify-center items-center sm:shadow-auth-form-shadow-1 w-auto h-auto min-h-[500px] max-h-full rounded-lg">
            <Image src={verifyAccountImage} alt='verify-account-image' width={400} />
            <h2 className="text-2xl py-1 font-semibold leading-[2] text-[#181818]">{!isVerified ? 'Verify Your Account' : 'Account Verified'}</h2>
            <p className="w-[75%] text-sm leading-6 text-center tracking-[0.25px] my-4">{!isVerified ? 'Insert the 6-digit code that we sent to your email.' : 'Registration process done, now you can fully access your account.'}</p>

            <form className='flex flex-col justify-center items-center'>
                {
                    !isVerified &&
                    < div >
                        {
                            inputs.map((_, index) => (
                                <input
                                key={index}
                                    ref={inputRefs[index]}
                                    type="text"
                                    maxLength={1}
                                    className="w-10 h-10 mx-1 text-center text-lg focus:outline-none focus:border-b-blue-900 bg-transparent border-b-2 border-b-slate-300"
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyUp={(e) => handleKeyUp(e, index)}
                                    onPaste={(e) => handlePaste(e)}
                                />
                            ))
                        }
                    </div>
                }
                <div className='flex flex-col-reverse gap-2'>
                    <button type='submit' className="auth-button" style={{ margin: 0 }} onClick={!isVerified ? handleUserRegistration : reRoute}>{!isVerified && 'Confirm'}{isVerified && 'Go to Login'}{processing && <Loader />}</button>
                    {!isVerified && <button type='' onClick={handleResend} className='my-4 cursor-pointer text-sm hover:text-gray-600'>Resend Code</button>}
                </div>
            </form >
        </div >
                                    </div>
    );
};

export default Verify;