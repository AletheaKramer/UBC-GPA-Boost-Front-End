import React from 'react';

interface FilterProps {
	text: string;
	onToggle: (isSelected: boolean) => void;
	isSelected: boolean; // Add this prop
}

const Filter: React.FC<FilterProps> = ({ text, onToggle, isSelected	 }) => {
	return (
		<label className="swap mx-2">
			<input type="checkbox"
				   checked={isSelected} // Control the checked state
				   onChange={(e) => onToggle(e.target.checked)} />
			<div className="swap-on btn w-max btn-primary leading-7 font-bold text-xl px-4">
				{text}
			</div>
			<div className="swap-off btn w-max btn-base-100 leading-7 font-bold text-xl px-4">
				{text}
			</div>
		</label>
	)
};

export default Filter;
