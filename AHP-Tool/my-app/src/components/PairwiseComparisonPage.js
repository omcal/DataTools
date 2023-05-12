import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import PairwiseComparison from './PairwiseComparison';
import { calculateAHP } from '../utils/ahp';

function PairwiseComparisonPage({ parameters }) {
    const [pairwiseMatrix, setPairwiseMatrix] = useState([]);

    const onPairwiseMatrixUpdate = (updatedMatrix) => {
        setPairwiseMatrix(updatedMatrix);
    };

    const equalWeights = Array(pairwiseMatrix.length).fill(1);
    const priorities = calculateAHP(pairwiseMatrix, equalWeights);

    return (
        <Container>
            <Box marginTop={4}>
                <Typography variant="h4">{parameters } Pairwise Comparison</Typography>
            </Box>
            <Box marginTop={4}>
                <PairwiseComparison
                    parameter={parameters }
                    onPairwiseMatrixUpdate={onPairwiseMatrixUpdate}
                />
            </Box>
            {priorities && (
                <Box marginTop={4}>
                    <Typography variant="h4">Results</Typography>
                    <Typography variant="h6">Priorities:</Typography>
                    {priorities.alternatives.map((alternative, i) => (
                        <Typography key={i} variant="subtitle1">
                            Parameter {alternative.alternative}: {alternative.score.toFixed(2)}
                        </Typography>
                    ))}
                    {/*<Typography variant="h6">Consistency:</Typography>*/}
                    {/*<Typography variant="subtitle1">*/}
                    {/*    CI: {priorities.consistency.CI.toFixed(2)}*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="subtitle1">*/}
                    {/*    CR: {priorities.consistency.CR.toFixed(2)}*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="subtitle1">*/}
                    {/*    {priorities.consistency.isConsistent*/}
                    {/*        ? 'The matrix is consistent'*/}
                    {/*        : 'The matrix is inconsistent'}*/}
                    {/*</Typography>*/}
                </Box>
            )}
        </Container>
    );
}


export default PairwiseComparisonPage;
