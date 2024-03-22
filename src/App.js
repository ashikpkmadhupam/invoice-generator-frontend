
import './App.css';
import axios from 'axios';
import {React, useState } from "react";
import { DatePicker } from 'rsuite';
import 'rsuite/DatePicker/styles/index.css';
import Table from './components/Table'
import Modal from './components/Modal';

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [formData,setFormData] = useState({
    inv_number: "",
    inv_date: new Date(),
    to_name: "",
    building_name: "",
    place_name: "",
    mobile: ""
  });
  const handleDeleteRow = (targetIndex) => {
      setRows(rows.filter((_,idx) => idx !== targetIndex));
  }

  const handleAddRow = (newRow) => {
    setRows([...rows,newRow]);
  }

  const handleFormChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
      e.preventDefault();
    

      var content = {
        invoiceNumber: formData.inv_number,
        date: formData.inv_date.toLocaleDateString(),
        toAddress: {
          name: formData.to_name,
          building: formData.building_name,
          street: formData.place_name,
          mobile: formData.mobile
        },
        tableContents: [...rows]
      };

      var url = 'https://invoice-generator-test-q5uiiw46la-el.a.run.app/invoice/pdf/generate';
      var axiosConfig = {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/json'
        }
      }

      axios.post(url,content,axiosConfig)
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Invoice_'+content.toAddress.name+'_'+content.date+'.pdf');
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          console.log(err.message);
        });
  }
  return (
    <div className="App">
      <div className='app-name'>
        <h2 className='heading'>Invoice Generator</h2>
      </div>
      <form>
        <div className="invoice_header">
          <input className="text_field" type='number' name='inv_number' id='inv_number' placeholder="Invoice number" value={formData.inv_number} onChange={handleFormChange} />
          <DatePicker className="date_field" placeholder="Invoice Date" format="dd/MM/yyyy" value={formData.inv_date} onChange={handleFormChange} /><br/>
          <input className="text_field" type='text' name='to_name' id='to_name' placeholder="Name of payee" value={formData.to_name} onChange={handleFormChange} /><br/>
          <input className="text_field" type='text' name='building_name' id='building_name' placeholder="Building name of payee" value={formData.building_name} onChange={handleFormChange} /><br/>
          <input className="text_field" type='text' name='place_name' id='place_name' placeholder="Place of payee"  value={formData.place_name} onChange={handleFormChange} /><br/>
          <input className="text_field" type='number' name='mobile' id='mobile' placeholder="mobile number of payee" value={formData.mobile} onChange={handleFormChange} /><br/>
        </div>
        <div className='Table'>
          <Table rows={[...rows]} deleteRow={handleDeleteRow} />
          <button  type='button' className='btn' onClick={() => setModalOpen(true)}>Add</button>
          {modalOpen && <Modal closeModal={() => {setModalOpen(false);}} addRow={handleAddRow} />}
        </div>
        <div className='btn-container'>
          <button type='button' className='btn-submit' onClick={handleFormSubmit}>Generate Invoice </button>
        </div>
      </form>
    </div>
  );
}

export default App;
