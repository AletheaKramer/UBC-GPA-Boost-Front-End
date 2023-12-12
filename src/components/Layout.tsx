// MyDrawerComponent.tsx
import React, {useState} from 'react';
import UpperArea from './UpperArea';
import LowerArea from './LowerArea';
import Filter from './Filter';

const Layout: React.FC = () => {

	const [insightResult, setInsightResult] = useState(null);
	const [department, setDepartmnet] = useState("");
	const [minGrade, setMinGrade] = useState("");
	const [isGradeInvalid, setIsGradeInvalid] = useState(false);
	const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({
		"500 Level": true,
		"400 Level": true,
		"300 Level": true,
		"200 Level": true,
		"100 Level": true
	});

	const handleData = (data: any, department: string, minGrade: string, isGradeInvalid: boolean) => {
		setInsightResult(data);
		setDepartmnet(department);
		setMinGrade(minGrade);
		setIsGradeInvalid(isGradeInvalid);
		console.log("minGrade: " + minGrade);
		console.log("department: " + department);
	};

	const handleFilterChange = (filter: string, isSelected: boolean) => {
		setSelectedFilters(prev => ({
			...prev,
			[filter]: isSelected
		}));
	};


	return (


	<div className="drawer">
		<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
		<div className="drawer-content flex flex-col">
			{/* Navbar */}
			<div className="w-full navbar bg-base-100">
				<div className="flex-none lg:hidden">
					<label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							 className="inline-block w-6 h-6 stroke-current">
							<path strokeLinecap="round" strokeLinejoin="round"
								  strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</label>
				</div>
				<div className="flex-1 px-2 mx-2">
					<p className="text-3xl font-bold">UBC GPA Boost</p>
				</div>

				<div className="flex-none hidden lg:block">
					<ul className="menu menu-horizontal">
						{/* Navbar menu content here */}

			        <Filter text={"500 Level"}
							onToggle={(isSelected) => handleFilterChange("500 Level", isSelected)}
							isSelected={selectedFilters["500 Level"]}
					/>
					<Filter text={"400 Level"}
							onToggle={(isSelected) => handleFilterChange("400 Level", isSelected)}
							isSelected={selectedFilters["400 Level"]}
					/>
					<Filter text={"300 Level"}
							onToggle={(isSelected) => handleFilterChange("300 Level", isSelected)}
							isSelected={selectedFilters["300 Level"]}
					/>
					<Filter text={"200 Level"}
							onToggle={(isSelected) => handleFilterChange("200 Level", isSelected)}
							isSelected={selectedFilters["200 Level"]}
					/>
					<Filter text={"100 Level"}
							onToggle={(isSelected) => handleFilterChange("100 Level", isSelected)}
							isSelected={selectedFilters["100 Level"]}
					/>


					</ul>
				</div>

			</div>
			{/* Page content here */}
			<UpperArea backgroundColor="bg-primary" onDataReceive={handleData} />
            <LowerArea insightResult={insightResult}
					   minGrade={Number(minGrade)}
					   isGradeInvalid={isGradeInvalid}
					   selectedFilters={selectedFilters} />
		</div>
		<div className="drawer-side">
			<label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
			<ul className="menu p-4 w-80 min-h-full bg-base-100">
				{/* Sidebar content here */}
				<article className="prose place-content-center">
					<h1 className="place-content-center">UBC GPA Boost</h1>
					<li className="place-content-center">
						<a className="btn btn-primary leading-7 font-bold text-xl px-4">Booster Courses</a>
					</li>
					<li className="place-content-center">
						<a className="btn btn-primary leading-7 font-bold text-xl px-4">Booster Profs</a>
					</li>
				</article>
			</ul>
		</div>
	</div>



	);
};

export default Layout;
