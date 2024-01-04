import React from "react";
import {Vortex} from 'react-loader-spinner'

const Preloader = (props) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-lg">
            {
                props.content ?
                    (
                        <div className="bg-white bg-opacity-40 rounded-lg p-8">
                            <h1 className="text-4xl font-bold">Content Goes Here</h1>
                            <p className="mt-4">This is a glass background div using Tailwind CSS.</p>
                        </div>
                    ) :
                    <Vortex
                        colors={['black', 'white', 'black', 'white', 'white', 'black']}
                        width={80}
                    />
            }
        </div>
    )
}
export default Preloader