import React, { useState } from "react";
import Papa from "papaparse";
import { TextField, Button, Typography, Box, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        fontSize: '0.875rem', // Adjust font size here
    },
}));

const ErrorText = styled(Typography)(({ theme }) => ({
    color: "red",
    marginTop: theme.spacing(2),
}));




function ParametersInput({ parameters, setParameters, alternatives, setAlternatives }) {
    const [parameter, setParameter] = useState("");
    const [alternative, setAlternative] = useState("");
    const [csvError, setCsvError] = useState("");


    const addParameter = () => {
        if (parameter) {
            setParameters([...parameters, parameter]);
            setParameter("");

            // Add a new column of default values to the matrix for each alternative
            setAlternatives(
                alternatives.map((alternative) => ({
                    ...alternative,
                    values: [...alternative.values, 1],
                }))
            );
        }
    };


    const addAlternative = () => {
        if (alternative) {
            setAlternatives([
                ...alternatives,
                {
                    name: alternative,
                    values: parameters.map(() => 1),
                },
            ]);
            setAlternative("");
        }
    };


    const clearAll = () => {
        setParameter("");
        setAlternative("");
        setParameters([]);
        setAlternatives([]);
        setCsvError("");
    };


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCsvError(""); // Clear previous error message

            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    const { data } = results;
                    if (data.length > 0) {
                        const newParameters = Object.keys(data[0]).filter((key) => key !== "Alternative");
                        setParameters(newParameters);

                        const newAlternatives = data.map((row) => {
                            const { Alternative, ...parameterValues } = row;
                            return {
                                name: Alternative,
                                values: Object.values(parameterValues).map(Number),
                            };
                        });

                        setAlternatives(newAlternatives);
                    } else {
                        setCsvError("The CSV file should have at least one row of data.");
                    }
                },
                error: (error) => {
                    console.error("CSV Parsing Error:", error);
                    setCsvError("Error parsing the CSV file. Please check the file format.");
                },
            });
        }
    };

    return (
        <StyledContainer>
            <Grid container spacing={3} justifyContent="flex-start" alignItems="center">
                <Grid item xs={12} container alignItems="center">
                    <Typography variant="h5">Parameters</Typography>
                    <StyledTextField
                        label="Parameter"
                        value={parameter}
                        onChange={(e) => setParameter(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={addParameter}>
                        Add Parameter
                    </Button>
                </Grid>
                <Grid item xs={12} container alignItems="center">
                    <Typography variant="h5">Alternatives</Typography>
                    <StyledTextField
                        label="Alternative"
                        value={alternative}
                        onChange={(e) => setAlternative(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={addAlternative}>
                        Add Alternative
                    </Button>
                </Grid>
                <Grid item xs={12} container alignItems="center">
                    <Typography variant="h5">Import CSV</Typography>
                    <input
                        type="file"
                        accept=".csv"
                        style={{ display: "none" }}
                        id="csv-upload"
                        onChange={handleFileUpload}
                        onClick={(event) => (event.target.value = "")}
                    />
                    <label htmlFor="csv-upload">
                        <Button variant="contained" component="span">
                            Choose CSV
                        </Button>
                    </label>
                    <Button variant="contained" color="secondary" onClick={clearAll}>
                        Clear All
                    </Button>
                </Grid>
                {csvError && (
                    <Grid item xs={12}>
                        <ErrorText variant="body1">{csvError}</ErrorText>
                    </Grid>
                )}
            </Grid>
        </StyledContainer>
    );
}

export default ParametersInput;
