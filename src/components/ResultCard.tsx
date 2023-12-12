import React, { useEffect, useRef, useState } from 'react';


interface ResultCardProps {
	sectionId: string;
	average: number;
	department: string;

}


const ResultCard: React.FC<ResultCardProps> = ({ sectionId, average, department }) => {

	const [isVisible, setIsVisible] = useState(true);
	const [apiData, setApiData] = useState([]);


	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const getProfs = () => {

		toggleVisibility();
		console.log("profs");

		let query =
			{
				"WHERE": {
					"AND": [
						{
							"IS": {
								"sections_dept": department
							}
						},
						{
							"GT": {
								"sections_year": 2010
							}
						},
						{
							"IS": {
								"sections_id": sectionId
							}
						}
					]
				},
				"OPTIONS": {
					"COLUMNS": [
						"sections_instructor",
						"overallAvg"
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
						"sections_instructor"
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
			.then(data => setApiData(data.result))
			.catch(error => console.error('Error:', error));

	}

	const radialProgressRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (radialProgressRef.current) {
			radialProgressRef.current.style.setProperty('--value', average.toFixed(2));
			radialProgressRef.current.style.setProperty('--size', '7rem');
			radialProgressRef.current.style.setProperty('--thickness', '4px');
		}
	}, [average, isVisible]);

	return (
		<div className="stack">

			{isVisible && ( <div className="card w-70 bg-secondary text-primary-content">
				<div className="card-body">

					<div className="flex">

						<div className="flex-1">
							<h2 className="font-bold text-base-100 text-xl card-title" style={{ textTransform: 'uppercase' }}>
								{department}
							</h2>
							<p className="font-bold text-base-100 text-6xl card-title mb-2">{sectionId}</p>
							<div className="card-actions justify-start">
								<button onClick={getProfs} className="btn">Profs</button>
							</div>
						</div>

						<div className="flex-1">
							<div className="radial-progress bg-primary text-xl font-black text-base-100"
								 ref={radialProgressRef}
								 role="progressbar">
								{average.toFixed(2)}%
							</div>
						</div>

					</div>

				</div>
			</div>
			)}


			<div className="card w-70 min-h-full bg-primary text-primary-content">

				<div className="card-body min-h-full">
					<h2 className="font-bold text-base-100 text-xl card-title" style={{ textTransform: 'uppercase' }}>
						{department} {sectionId}
					</h2>


					<div className="overflow-y-auto max-h-16">
						<table className="table table-xs table-pin-rows table-pin-cols">
							<thead>
							<tr>
								<th>Instructor</th>
								<th>Average</th>
							</tr>
							</thead>
							<tbody>
							{apiData
								.map((item: any, index) => (
								<tr key={index}>
									<td>{item.sections_instructor || 'Other'}</td>
									<td>{item.overallAvg.toFixed(2)}</td>
								</tr>
							))}
							</tbody>
						</table>
					</div>


					<div className="card-actions justify-start">
						<button onClick={toggleVisibility} className="btn btn-xs">Back</button>
					</div>
				</div>


			</div>


		</div>






	);
}

export default ResultCard;
