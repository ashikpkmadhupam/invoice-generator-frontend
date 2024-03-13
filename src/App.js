
import './App.css';
import React, { useState } from "react";
import { DatePicker } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';

function App() {

  return (
    <div className="App">
      <form>
        <label>Invoice Number :
          <input type='number' name='inv_number' id='inv_number'/>
        </label> <br/>
        <label>Invoice Date :
        <DatePicker placeholder="Select Invoice Date" format="dd/MM/yyyy" />
        </label>
      </form>
    </div>
  );
}

export default App;
