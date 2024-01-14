// components/Modal.js
import React from 'react';
import {FaTimes} from 'react-icons/fa'

const Modal = ({ isOpen, onClose, children }) => {
    const modalClasses = isOpen
    ? 'fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-lg z-[9999]'
        : 'hidden';

    return (
        <div className={modalClasses}>
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute bg-white p-8 py-10 rounded-lg shadow-lg  w-auto">
                <button className="absolute top-3 right-5 p-2" onClick={onClose}>
                    <FaTimes size={25} color='red'/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
