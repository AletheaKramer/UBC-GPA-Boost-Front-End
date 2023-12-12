// UpperArea.tsx
import React, {useState} from 'react';

const upperAreaStyle: React.CSSProperties = {
	height: '20vh',
	width: '60%',
};
interface InputBoxProps {
    onDataReceive: (data: any[], department: string, minGrade: string, isGradeInvalid: boolean) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onDataReceive }) => {
	// Combine the class name with any additional styling

	const [department, setDepartmnet] = useState("");
	const [minGrade, setMinGrade] = useState("");

	const [isGradeInvalid, setIsGradeInvalid] = useState(false);


	const onChangeDepartment = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDepartmnet(event.target.value);
	}

	const onChangeMinGrade = (event: React.ChangeEvent<HTMLInputElement>) => {
		const grade = event.target.value;
		setMinGrade(grade);

		const gradeNumber = parseFloat(grade);
		setIsGradeInvalid(
			isNaN(gradeNumber) ||
			gradeNumber < 0 ||
			gradeNumber > 100
		);
	}


	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Submitted");

		let query =
			{
				"WHERE": {
					"AND": [
						{
							"GT": {
								"sections_year": 2010
							}
						},
						{
							"IS": {
								"sections_dept": department
							}
						}
					]
				},
				"OPTIONS": {
					"COLUMNS": [
						"sections_id",
						"overallAvg",
						"sections_dept"
					],
					"ORDER": {
						"dir": "DOWN",
						"keys": [
							"overallAvg"
						]
					}
				},
				"TRANSFORMATIONS": {
					"GROUP": [
						"sections_id",
						"sections_dept"
					],
					"APPLY": [
						{
							"overallAvg": {
								"AVG": "sections_avg"
							}
						}
					]
				}
			}
		fetch("http://localhost:4321/query", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(query)
		}).then(response => response.json())
			.then(data => onDataReceive(data.result, department, minGrade, isGradeInvalid))
			.catch(error => console.log(error));

	}

	return (

		<div className="bg-base-100 rounded-lg flex justify-center items-center" style={upperAreaStyle}>

			<div>
				<form onSubmit={onSubmit} className="flex flex-row">
					<input value={department}
						   onChange={onChangeDepartment}
						   type="text"
						   placeholder="Department"
						   className="bg-neutral input input-bordered input-lg border-2 input-primary w-full max-w-xs" />


					<input value={minGrade}
						   onChange={onChangeMinGrade}
						   type="number"
						   placeholder="Minimum Grade"
						   className="mx-10 bg-neutral input input-bordered input-lg border-2 input-primary w-full max-w-xs" />

					<button type="submit" className="btn btn-lg btn-primary font-bold text-xl">Submit</button>

				</form>
			</div>

		</div>
	)};

export default InputBox;
