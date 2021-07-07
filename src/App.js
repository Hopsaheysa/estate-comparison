import logo from './logo.svg';
import './App.scss';
import HouseBar from './Components/HouseBar';
import { useEffect, useState } from 'react';

function App() {


  // useEffect(() => {
  //   getBar()
  // }, [offset])


  return (
    <div className="App">
      <h1 className="headline">Estate Comparison</h1>
      <hr />

      <HouseBar />

    </div>
  );
}

export default App;
