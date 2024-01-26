import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css'; 
import { useNavigate } from 'react-router-dom';
import { addField } from './actions';



function DisplayFields() {
  const fields = useSelector((state) => state.fields);
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const handleConfirm = () => {

    dispatch(addField(fields));


    Navigate('/DynamicForm');
  };

  const handleResetFields = () => {
    dispatch({ type: 'RESET_FIELDS' });
  };

  return (
    <div>
      {fields.length > 0 && (
        <div>
          <h2>List of Added Fields</h2>
          <table className="field-table">
            <thead>
              <tr>
                <th>Field Display Name</th>
                <th>Field Data Type</th>
                <th>Field Max Length Allowed</th>
                <th>Mandatory</th>
                <th>Field Data</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={index}>
                  <td>{field.fieldName}</td>
                  <td>{field.fieldDataType}</td>
                  {(field.fieldDataType === "number" || field.fieldDataType === "string") && <td>max {field.fieldMaxLength} digits</td>}
                  {field.fieldDataType === "date" && <td>Between {field.startDate.toLocaleDateString('en-GB')} to {field.endDate.toLocaleDateString('en-GB')}</td>}
                  <td>{field.mandatory}</td>
                  {field.fieldType === "dropdown" && <td>{field.fieldData.map(item => <p>{item}</p>)}</td>}
                  {field.fieldType != "dropdown" && <td></td>}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleConfirm} style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Confirm</button>
          <button onClick={handleResetFields} style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default DisplayFields;
