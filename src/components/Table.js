import './Table.css';

import React from 'react';
import {BsFillTrashFill,BsFillPencilFill} from "react-icons/bs";

function Table({rows, deleteRow}) {
    return (

        
        <div className="table-wrapper">
            <table className='table'>
                <thead>
                    <th className='particulars'>Particulars</th>
                    <th>Area</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {
                        rows.map((row,idx) => {
                            return (<tr key={idx}>
                                <td className='particulars'>{row.particulars}</td>
                                <td>{row.area}</td>
                                <td>{row.rate}</td>
                                <td>{row.amount}</td>
                                <td>
                                    <span className='actions'>
                                        <BsFillTrashFill  className='delete-btn' onClick={() => deleteRow(idx)}/>
                                        <BsFillPencilFill className='edit-btn'/>
                                    </span>
                                </td>
                            </tr>);
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default Table;