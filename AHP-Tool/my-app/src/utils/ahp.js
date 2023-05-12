function normalize(matrix) {
    const colSums = matrix[0].map((_, i) => matrix.reduce((sum, row) => sum + row[i], 0));
    return matrix.map(row => row.map((value, i) => value / colSums[i]));
}

function calculateRowAverages(normalizedMatrix) {
    return normalizedMatrix.map(row => row.reduce((sum, value) => sum + value, 0) / row.length);
}

function calculateCI(matrix, priorities) {
    const n = matrix.length;
    const weightedSum = matrix.map((row, i) =>
        row.reduce((sum, value, j) => sum + value * priorities[j], 0)
    );
    const lambdaMax = weightedSum.reduce((sum, value, i) => sum + value * priorities[i], 0);
    return (lambdaMax - n) / (n - 1);
}

function getRandomIndex(n) {
    const RI_VALUES = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
    return RI_VALUES[n - 1] || 1.49;
}

function calculateCR(CI, n) {
    const RI = getRandomIndex(n);
    return CI / RI;
}

function calculateAHP(matrix, priorities) {
    if (matrix.length === 0) {
        return null;
    }

    const normalizedMatrix = normalize(matrix);
    const rowAverages = calculateRowAverages(normalizedMatrix);
    const scores = rowAverages.map((average, i) =>
        priorities.reduce((sum, priority, j) => sum + priority * matrix[i][j], 0)
    );
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const normalizedScores = scores.map(score => score / totalScore);

    const CI = calculateCI(matrix, priorities);
    const CR = calculateCR(CI, priorities.length);

    return {
        alternatives: normalizedScores.map((score, i) => ({
            alternative: i + 1,
            score,
        })),
        consistency: {
            CI,
            CR,
            isConsistent: CR <= 0.1,
        },
    };
}

export { calculateAHP };
