// UpperArea.tsx
import React from 'react';
import InputBox from './InputBox';


interface UpperAreaProps {
	backgroundColor: string;
    onDataReceive: (data: any[], department: string, minGrade: string, isGradeInvalid: boolean) => void;
}

const UpperArea: React.FC<UpperAreaProps> = ({ backgroundColor, onDataReceive }) => {
	// Combine the class name with any additional styling
	const upperAreaStyle: React.CSSProperties = {
		height: '30vh',
		width: '100%',
	};


	return <div className={`${backgroundColor} flex justify-center items-center`} style={upperAreaStyle}>

		<InputBox onDataReceive={onDataReceive}/>


	</div>;
};

export default UpperArea;
