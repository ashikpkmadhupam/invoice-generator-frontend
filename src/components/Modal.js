import { useState } from 'react';
import React from 'react';
import './Modal.css'



function Modal({closeModal,addRow}) {

    const [formState,setFormState] = useState({
        particulars: "",
        area: 0,
        rate: 0,
        amount: 0
    });

    const handleFormChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addRow(formState);
        closeModal();
    }
    return (
        <div className='modal-container' onClick={(e) => {
            if(e.target.className === 'modal-container'){
                closeModal();
            }    
        }}>
            
            <div className='modal'>
                <form>
                    <div className='form-group'>
                        <label htmlFor='particulars'>Particulars</label>
                        <textarea name='particulars' value={formState.particulars} onChange={handleFormChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='area'>Area</label>
                        <input type='number' name='area' value={formState.area} onChange={handleFormChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='rate'>Rate</label>
                        <input type='number' name='rate' value={formState.rate} onChange={handleFormChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='amount'>Amount</label>
                        <input type='number' name='amount' value={formState.amount} onChange={handleFormChange} />
                    </div>
                    <button className='add-btn' type='submit' onClick={handleSubmit}>Add</button>
                </form>
            </div>
        </div>
    );

}

export default Modal;