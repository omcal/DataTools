import React, { useState, useEffect } from 'react';
import { calculateAHP } from '../utils/ahp';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
}));

function CriteriaMatrix({ parameters, alternatives, onCalculate }) {
    const [matrix, setMatrix] = useState([]);
    const [priorities, setPriorities] = useState(Array(parameters.length).fill(1 / parameters.length));

    useEffect(() => {
        const newMatrix = alternatives.map(() => parameters.map(() => 1));
        setMatrix(newMatrix);
    }, [parameters, alternatives]);

    useEffect(() => {
        setPriorities(Array(parameters.length).fill(1 / parameters.length));
    }, [parameters]);
    useEffect(() => {
        const newMatrix = alternatives.map((alternative) => alternative.values);
        setMatrix(newMatrix);
    }, [alternatives]);

    const updateMatrixValue = (rowIndex, colIndex, value) => {
        const newMatrix = [...matrix];
        newMatrix[rowIndex][colIndex] = parseFloat(value);
        setMatrix(newMatrix);
    };

    const handleCalculate = () => {
        if (matrix.length === 0) {
            toast.error('Please add at least one alternative.');
            return;
        }
        const results = calculateAHP(matrix, priorities);
        console.log("Consistency:", results.consistency);
        if (results.consistency.isConsistent===false){
            toast.error('The matrix is may inconsistent. Please check the matrix and try again.');
            onCalculate(results.alternatives);
        }
        else{
            toast.success('The matrix is consistent. You can proceed to the next step or You can export the results.');
            onCalculate(results.alternatives);
        }
    };

    const handlePriorityChange = (index, newValue) => {
        // Ensure the newValue is within the valid range
        if (newValue < 0 || newValue > 1) {
            return; // Exit the function without updating the state
        }

        const newPriorities = [...priorities];
        newPriorities[index] = newValue;
        setPriorities(newPriorities);
    };



    //it normalizes the priorities
    // const handlePriorityChange = (index, newValue) => {
    //     const sum = priorities.reduce((acc, _, i) => {
    //         return i === index ? acc : acc + priorities[i];
    //     }, 0);
    //     const factor = (1 - newValue) / sum;
    //     const newPriorities = priorities.map((value, i) =>
    //         i === index ? newValue : value * factor
    //     );
    //     setPriorities(newPriorities);
    // };

    return (
        <div>
            <ToastContainer />
            <Typography variant="h6">Criteria Matrix</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Alternatives</StyledTableCell>
                            {parameters.map((param, i) => (
                                <StyledTableCell key={i}>{param}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alternatives.map((alt, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell>{alt.name}</TableCell>
                                {parameters.map((_, colIndex) => (
                                    <TableCell key={colIndex}>
                                        <TextField
                                            type="number"
                                            inputProps={{ step: "0.01" }}
                                            value={matrix[rowIndex]?.[colIndex] || alt.values[colIndex] || ""}
                                            onChange={(e) => updateMatrixValue(rowIndex, colIndex, e.target.value)}
                                            fullWidth
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" style={{ marginTop: '16px' }}>Priorities</Typography>
            <Grid container spacing={2} alignItems="center">
                {parameters.map((param, i) => (
                    <Grid item key={i}>
                        <label>{param}: </label>
                        <TextField
                            type="number"
                            inputProps={{ step: "0.01" }}
                            value={priorities[i] || ""}
                            onChange={(e) => {
                                const newValue = parseFloat(e.target.value);
                                handlePriorityChange(i, newValue);
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={handleCalculate} style={{ marginTop: '16px' }}>
                Calculate
            </Button>
        </div>
    );
}

export default CriteriaMatrix;
