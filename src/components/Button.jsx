import React from 'react';
import Loader from '../commons/Loader';

export const Button = (props) => {
    const bgColor = props.themeColor ? props.themeColor : 'primaryBlue'
    const textColor = props.themeColor ? props.themeColor : 'white'
    const borderColor = props.themeColor ? props.themeColor : 'primaryBlue' 
    
    const buttonClasses = {
        'flex': true,
        'justify-between': true,
        'items-center': true,
        'space-x-2': true,
        'text-sm': true,
        'shadow-lg': true,
        'rounded-lg': true,
        'w-auto': true,
        'h-auto': true,
        'my-3': true,
        'px-3': true,
        'py-2': true,
        'border-[1px]': true,
        [`border-[${borderColor}]`]: true,
        [`bg-[${props.type === 'fill' ? bgColor : 'white'}]`]: true,
        [`text-[${props.type === 'fill' ? 'white' : textColor}]`]: true,
    };

    return (
        <button style={{ transition: 'all 0.8s' }} className={Object.keys(buttonClasses).filter(key => buttonClasses[key]).join(' ')} onClick={() => props.onClick()}>
            {props.children}
        </button>
    );

};


export const LoaderButton = (props) => {
    return (
        <>
            {
                props.loading ? <Loader/> :
                    <button style={{ transition: 'all 0.8s' }} className='flex justify-center items-center w-full border-[1px] relative z-10 rounded-md border-gray-400 py-1 hover:border-primaryBlue hover:text-primaryBlue transition-all duration-300'
                        onClick={(e) => props.onClick(e)} disabled={props.loading}>
                        {props.children}
                    </button>
            }
        </>
    );
};