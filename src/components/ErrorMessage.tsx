import { PropsWithChildren } from 'react';
import 'animate.css'

const ErrorMessage = ({ children } : PropsWithChildren) => {
    return (
        <div 
            className='border-l-4 text-sm border-red-800 text-red-800 bg-red-100 mt-10 font-extrabold p-5 uppercase animate__animated animate__fadeIn'
        >
            { children }
        </div>
    )
}

export default ErrorMessage;