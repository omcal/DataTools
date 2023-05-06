import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import ParametersInput from "./components/ParametersInput";
import CriteriaMatrix from "./components/CriteriaMatrix";
import Result from "./components/Result";
import Footer from "./components/Footer";
import "materialize-css/dist/css/materialize.min.css";

function App() {
  const [parameters, setParameters] = useState([]);
  const [alternatives, setAlternatives] = useState([]);
  const [results, setResults] = useState(null);

  return (
      <div className="App">
        <Header />
        <ParametersInput
            parameters={parameters}
            setParameters={setParameters}
            alternatives={alternatives}
            setAlternatives={setAlternatives}
        />
        <CriteriaMatrix
            parameters={parameters}
            alternatives={alternatives}
            onCalculate={setResults}
        />
        {results && <Result results={results} alternativeNames={alternatives}/>}
        <Footer />
      </div>
  );
}

export default App;
