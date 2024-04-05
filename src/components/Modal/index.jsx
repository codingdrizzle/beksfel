// components/Modal.js
import React from 'react';
import { FaTimes } from 'react-icons/fa'
import Preloader from '../../commons/Preloader';

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {
                isOpen ?
                    <div className={'fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-lg z-[9999]'}>
                        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
                        <div className="absolute right-0 top-0 h-full bg-white p-8 py-10 rounded-lg shadow-lg w-[90%] transition-transform transform">
                            <button className="absolute top-3 right-5 p-2" onClick={onClose}>
                                <FaTimes size={25} color='red' />
                            </button>
                            {children}
                        </div>
                    </div> : <></>
            }
        </>
    );
};


export const ModalLoader = ({ isOpen }) => {
    return (
        <>
            {
                isOpen &&
                    <div className={'fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-lg z-[9999999]'}>
                        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
                            <Preloader/>
                        </div>

                    </div>
            }
        </>
    );
};

export default Modal;
