import React from 'react';
import { useAlert } from '../../hooks/useCustomAlert';

const Alert = () => {
    const { alert } = useAlert();

    const getAlertStyle = (type) => {
        switch (type) {
            case 'success':
                return { background: '#cdfacd', color: '#239923' };
            case 'warning':
                return { background: '#faf8cd', color: '#dbd830' };
            case 'error':
                return { background: '#fad8cd', color: '#bf4219' };
            default:
                return { background: '#dcf0f7', color: '#2583db ' };
        }
    };

    return (
        <div className='fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] w-auto min-w-[300px] max-w-[50%] fly-in'>
            {alert && (
                <div
                    style={{ ...getAlertStyle(alert.type), borderWidth: '2px', borderStyle: 'solid' }}
                    className={`text-center text-sm py-3 px-6 tracking-[0.4px] rounded-lg bg-[${getAlertStyle(alert.type).background}] text-[${getAlertStyle(alert.type).color}] border-[${getAlertStyle(alert.type).color}]`} >
                    {alert.message}
                </div>
            )}
        </div>
    );
};

export default Alert;
