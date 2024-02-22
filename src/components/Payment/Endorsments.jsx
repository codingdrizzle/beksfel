import React from 'react'
import { useAtom } from 'jotai'
import Input from '../Input'
import { pv } from '../../store'
import SignatureCanvas from 'react-signature-canvas'

const Endorsments = () => {

    const [pV, setPv] = useAtom(pv);

    const handleFieldChange = (field, value) => {
        setPv((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className='flex border-[1px] border-gray-400 items-center space-x-3'>
            <div className='w-full md:w-1/2 flex justify-between items-center flex-wrap space-x-2'>
                <h1>Approved By</h1>
            </div>
            <div className='w-full md:w-1/2 flex justify-between items-center flex-wrap space-x-2'>
                <h1>Received By</h1>
                <SignatureCanvas
                
                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} 
                    //ref={data => handleFieldChange('receiver_signature', data)}
                    />
            </div>
        </div>
    )
}

export default Endorsments;