import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Grid from './components/Grid'
import Chart from './components/Chart';
import PokemonDetail from './components/PokemonDetail';
import './App.css';
import dashboard from './assets/dashboard.jpg';

const MainComponent = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');

  const [rowData, setRowData] = useState([]);

  // pull the data from the api via fetch
  let fetchUrl = "http://localhost:5003/api/pokemon/";
  if(name != null)
  {
    fetchUrl = "http://localhost:5003/api/pokemon/?name=" + name;
  }
  useEffect(() => {
      fetch(fetchUrl, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json'
      },
      })
      .then((response) => response.json())
      .then((data) => {
          setRowData(data);
      })
      .catch((error) => console.log("error" + error));
  }, []);

  // display the proper element
  if(name == null)
  {
    return (
    <div className="App">
      <h2 class='header'>
        <img src={dashboard} />
      </h2>
      <Chart data={rowData} />
      <Grid rowData={rowData} />
    </div>
    )
  }
  else {
    return (
      <div>
        <PokemonDetail name={name} rowData={rowData} />
      </div>
    )
  }
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/pokemon" element={<MainComponent />} />
      </Routes>
    </Router>
  );
};

export default App

