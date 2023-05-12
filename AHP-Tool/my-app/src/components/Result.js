import React from "react";

function Result({ results, alternativeNames = [] }) {
    // Sort results by score in descending order
    const sortedResults = results
        .map((result, index) => ({
            ...result,
            name: alternativeNames[index]?.name || `Alternative ${index + 1}`,
        }))
        .sort((a, b) => b.score - a.score);

    const exportToCSV = () => {
        const headers = ["Alternative", "Score"];
        const rows = sortedResults.map((result) => [
            result.name,
            result.score.toFixed(4),
        ]);
        let csvContent =
            "data:text/csv;charset=utf-8," +
            headers.join(",") +
            "\n" +
            rows.map((row) => row.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "results.csv");
        document.body.appendChild(link);

        link.click();
    };

    return (
        <div>
            <h2>Results</h2>
            <table>
                <thead>
                <tr>
                    <th>Alternative</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {sortedResults.map((result, index) => (
                    <tr key={index}>
                        <td>{result.name}</td>
                        <td>{result.score.toFixed(4)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={exportToCSV}>Export to CSV</button>
        </div>
    );
}

export default Result;
