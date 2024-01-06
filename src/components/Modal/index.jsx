// components/Modal.js
import React from 'react';
import {FaTimes} from 'react-icons/fa'

const Modal = ({ isOpen, onClose, children }) => {
    const modalClasses = isOpen
    ? 'fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-lg'
        //? 'fixed inset-0 flex items-center justify-center z-50'
        : 'hidden';

    return (
        <div className={modalClasses}>
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="absolute bg-white p-8 rounded-lg shadow-lg  w-auto min-w-[500px]">
                <button className="absolute top-0 right-0 p-2" onClick={onClose}>
                    <FaTimes color='red'/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
