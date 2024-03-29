import React from 'react'

const Input = (props) => {
    return (
        <input disabled={props.disabled} type={props.text ? props.text : "text"} className={'bg-transparent border-[1px] border-gray-400 focus:border-blue-400 focus:outline-none w-full px-3 py-2 rounded-lg disabled:cursor-not-allowed' } placeholder={props.placeholder} value={props.value} onChange={(e) => props.onChange(e)}/>
    );
}

Input.defaultProps = {
    disabled : false
}

export default Input