import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
}));

function PairwiseComparison({ parameter, onPairwiseMatrixUpdate }) {
    const [pairwiseMatrix, setPairwiseMatrix] = useState(
        Array.from({ length: parameter.length }, () => Array(parameter.length).fill(1))
    );

    useEffect(() => {
        onPairwiseMatrixUpdate(pairwiseMatrix);
    }, [pairwiseMatrix, onPairwiseMatrixUpdate]);

    const updateMatrixValue = (rowIndex, colIndex, value) => {
        const newMatrix = [...pairwiseMatrix];
        newMatrix[rowIndex][colIndex] = parseFloat(value);
        newMatrix[colIndex][rowIndex] = 1 / parseFloat(value);
        setPairwiseMatrix(newMatrix);
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Parameters</StyledTableCell>
                        {parameter.map((param, i) => (
                            <StyledTableCell key={i}>{param}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {parameter.map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            <StyledTableCell>{parameter[rowIndex]}</StyledTableCell>
                            {parameter.map((_, colIndex) => (
                                <TableCell key={colIndex}>
                                    {rowIndex === colIndex ? (
                                        <TextField disabled value={1} fullWidth />
                                    ) : (
                                        <TextField
                                            type="number"
                                            inputProps={{ step: '0.01', min: '0.01' }}
                                            value={pairwiseMatrix[rowIndex][colIndex]}
                                            onChange={(e) =>
                                                updateMatrixValue(rowIndex, colIndex, e.target.value)
                                            }
                                            fullWidth
                                        />
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PairwiseComparison;
