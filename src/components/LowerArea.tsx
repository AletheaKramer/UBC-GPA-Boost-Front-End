import React, { useState } from "react";
import ResultCard from "./ResultCard";
import ErrorMessage from "./ErrorMessage";


interface InsightResultItem {
    sections_id: string;
    overallAvg: number;
    sections_dept: string;
}

interface LowerAreaProps {
    insightResult?: any;
	minGrade: number;
    isGradeInvalid: boolean;
	selectedFilters: Record<string, boolean>;
}

const LowerArea: React.FC<LowerAreaProps> = ({ insightResult, minGrade, isGradeInvalid, selectedFilters }) => {

    const lowerAreaStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)', // Creates 5 columns
        gridGap: '10px', // Adjust as needed for spacing between cards
        padding: '20px', // Margin around the entire grid
        justifyContent: 'center'
    };

    let filteredResults :any[] = [];

    const shouldShowError = () => {
        if (!insightResult) {
            return false;
        }

        if (insightResult.length === 0) {
			return true;
		}

		console.log("selectedFilters: " + selectedFilters["500 Level"]);

        filteredResults = insightResult
			.filter((item: InsightResultItem) => item.overallAvg > minGrade)
			.filter((item: InsightResultItem) => {
				if (selectedFilters["500 Level"] && item.sections_id.startsWith("5")) {
					return true;
				} else if (selectedFilters["400 Level"] && item.sections_id.startsWith("4")) {
					return true;
				} else if (selectedFilters["300 Level"] && item.sections_id.startsWith("3")) {
					return true;
				} else if (selectedFilters["200 Level"] && item.sections_id.startsWith("2")) {
					return true;
				} else if (selectedFilters["100 Level"] && item.sections_id.startsWith("1")) {
					return true;
				}
				return false;
			});

		console.log("filteredResults: " + filteredResults)


        return filteredResults.length === 0;
    };

    return (
        <div style={lowerAreaStyle}>
            {shouldShowError() || isGradeInvalid ? (
                <div className="flex flex-col justify-center items-center col-span-5">
                    {shouldShowError() && <ErrorMessage message={"No results found"} />}
                    {isGradeInvalid && <ErrorMessage message={"Invalid grade"} />}
                </div>
            ) : (
                filteredResults.map((item: InsightResultItem) => (
                    <ResultCard
                        key={item.sections_id}
                        sectionId={item.sections_id}
                        average={item.overallAvg}
                        department={item.sections_dept}
                    />
                ))
            )}
        </div>
    );
}

export default LowerArea;
