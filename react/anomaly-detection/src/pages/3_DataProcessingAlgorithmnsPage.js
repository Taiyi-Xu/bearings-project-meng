
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AlgorithmSelector from '../components/AlgorithmSelector';
import DatasetSelector from '../components/DatasetSelector';
import ResultsDisplay from '../components/ResultDisplay';
import Login from '../components/Login';


function DataProcessingAlgorithms() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Fetch datasets from Flask API
    axios.get('http://localhost:5000/DataAlgorithmProcessing/get-datasets')
      .then((res) => setDatasets(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleRun = async (params) => {
    try {
      const response = await axios.post('http://localhost:5000/DataAlgorithmProcessing/run-algorithm', {
        
        dataset: selectedDataset,
        algorithm: selectedAlgorithm,
        params,
      });

      console.log("Request Payload:", {
        dataset: selectedDataset,
        algorithm: selectedAlgorithm,
        params,
      });

      setResults(response.data);
    } catch (error) {
      console.error('Error running algorithm:', error);
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        backgroundImage: 'url(/gears.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Login Button at the Top */}
      <Login />  
      
      <h1 style={{ fontSize: '60px', paddingTop: '50px' , textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>Data Processing Algorithms</h1>
  
      {/* Explanation Text Box */}
      <p style={{ fontSize: '19px', maxWidth: '700px', margin: '0 auto', padding: '10px', lineHeight: '1.6', backgroundColor: "#f9f9f9",
                borderRadius: "10px", }}>
        This page allows you to select datasets and apply different data processing algorithms. You can choose
        from a list of available datasets and select the algorithm you wish to run on the data. After the algorithm
        finishes processing, the results will be displayed below for further analysis. (text can be changed)
      </p>
  
      {/* Dataset Selector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", marginBottom: "2rem", paddingTop: '20px' }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold" }}>Select Dataset:</label>
          <DatasetSelector datasets={datasets} onSelect={setSelectedDataset} />
        </div>
      </div>

      {/* Algorithm Selector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <label style={{ fontSize: "20px", fontWeight: "bold" }}>Select Algorithm:</label>
          <AlgorithmSelector onSelect={setSelectedAlgorithm} onRun={handleRun} />
        </div>
      </div>

  
      {results && <ResultsDisplay results={results} />}
    </div>
  );
  

}

export default DataProcessingAlgorithms;
