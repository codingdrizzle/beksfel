import React, { useEffect, useState } from 'react';
import Loader from '../commons/Loader';

export const Button = (props) => {
    const [borderColor, setBorderColor] = useState('primaryBlue')
    const [textColor, setTextColor] = useState('white')
    const [bgColor, setBgColor] = useState('primaryBlue')
    const { theme, variant, customClasses } = props

    useEffect(() => {
        if (theme) {
            setBorderColor(theme)
            setTextColor(theme)
            setBgColor(theme)
        }
    }, [theme])

    const themeStyles = {
        borderColor: variant ? borderColor : '#3786FB',
        backgroundColor: variant === 'fill' ? bgColor : variant === 'outline' ? 'transparent' : '#3786FB',
        color: variant === 'fill' ? 'white' : variant === 'outline' ? textColor : 'white'
    }

    const buttonClasses = `flex justify-between items-center space-x-2 text-base shadow-sm rounded-md w-auto h-auto my-3 px-5 py-3 border-[1px] font-medium transition-all duration-700 transform hover:scale-[1.04] ${customClasses || ''} `

    return (
        <button style={themeStyles} className={buttonClasses} onClick={() => props.onClick()}>
            {props.children}
        </button>
    );

};

export const LoaderButton = (props) => {
    const [borderColor, setBorderColor] = useState('primaryBlue')
    const [textColor, setTextColor] = useState('white')
    const [bgColor, setBgColor] = useState('primaryBlue')
    const { theme, variant, isLoading, customClasses } = props

    useEffect(() => {
        if (theme) {
            setBorderColor(theme)
            setTextColor(theme)
            setBgColor(theme)
        }
    }, [theme])

    const themeStyles = {
        borderColor: variant ? borderColor : '#3786FB',
        backgroundColor: variant === 'fill' ? bgColor : variant === 'outline' ? 'transparent' : '#3786FB',
        color: variant === 'fill' ? 'white' : variant === 'outline' ? textColor : 'white'
    }

    const buttonClasses = `flex justify-between items-center space-x-2 text-base shadow-sm rounded-md w-auto h-auto my-3 px-5 py-3 border-[1px] font-medium transition-all duration-700 transform hover:scale-[1.04] ${customClasses || ''} `

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <button style={themeStyles} className={buttonClasses}
                        onClick={(e) => props.onClick(e)} disabled={props.loading}>
                        {props.children}
                    </button>
            }
        </>
    );
};