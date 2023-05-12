import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Outlet, Routes } from 'react-router-dom';
import Header from './components/Header';
import ParametersInput from './components/ParametersInput';
import CriteriaMatrix from './components/CriteriaMatrix';
import Result from './components/Result';
import Footer from './components/Footer';
import PairwiseComparisonPage from './components/PairwiseComparisonPage';
import 'materialize-css/dist/css/materialize.min.css';

function App() {
    const [parameters, setParameters] = useState([]);
    const [alternatives, setAlternatives] = useState([]);
    const [results, setResults] = useState(null);

    return (
        <Router>
            <div className="App">
                <Header />
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/pairwise">Pairwise Comparison</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home setParameters={setParameters} />} />
                    <Route path="/pairwise" element={<PairwisePage parameters={parameters} />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

function Home({ setParameters }) {
    const [parameters, setParametersLocal] = useState([]);
    const [alternatives, setAlternatives] = useState([]);
    const [results, setResults] = useState(null);

    const handleParametersChange = (newParameters) => {
        setParametersLocal(newParameters);
        setParameters(newParameters);
    };

    return (
        <>
            <ParametersInput
                parameters={parameters}
                setParameters={handleParametersChange}
                alternatives={alternatives}
                setAlternatives={setAlternatives}
            />
            <CriteriaMatrix parameters={parameters} alternatives={alternatives} onCalculate={setResults} />
            {results && <Result results={results} alternativeNames={alternatives} />}
        </>
    );
}

function PairwisePage({ parameters }) {
    return (
        <>
            <PairwiseComparisonPage parameters={parameters} />
        </>
    );
}

export default App;
