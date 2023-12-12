// UpperArea.tsx
import React from 'react';

const errorMessageStyle: React.CSSProperties = {
    height: '5vh',
    width: '61.5%',
};
interface errorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<errorMessageProps> = ({ message }) => {

    return (
        <div className="bg-error my-2 rounded-lg flex justify-center items-center" style={errorMessageStyle}>
            <div className="text-center text-2xl text-white font-bold">
                {message}
            </div>
        </div>
    )};

export default ErrorMessage;
