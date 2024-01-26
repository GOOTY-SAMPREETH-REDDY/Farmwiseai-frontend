import React, { useState } from 'react';
import DisplayFields from './DisplayFields';
import { useDispatch } from 'react-redux';
import { addField } from './actions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Form() {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('');
  const [showFieldOptions, setShowFieldOptions] = useState(false);
  const [fieldType, setFieldType] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [fieldDataType, setFieldDataType] = useState('string');
  const [fieldMaxLength, setFieldMaxLength] = useState('');
  const [mandatory, setMandatory] = useState('yes');
  const [fieldData, setFieldData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [confirmC, setConfirmC] = useState(false);
  const [fieldCount, setFieldCount] = useState(0);

  const handleAddField = () => {
    setShowFieldOptions(true);
  };

  const handleFieldDataChange = (e) => {


    const inputValue = e.target.value;
    if (Array.isArray(inputValue)) {

      setFieldData(inputValue);
    } else if (typeof inputValue === 'string') {

      const fieldDataArray = inputValue.split(',');
      setFieldData(fieldDataArray);
    }

  };

  const handleConfirmField = () => {

    setConfirmC(true);
    setFieldCount(prevCount => prevCount + 1);
    if (fieldName.trim() === '') {
      alert('Please enter Field Display Name');
      return;
    }



    dispatch(
      addField({
        userType,
        fieldType,
        fieldName,
        fieldDataType,
        fieldMaxLength,
        mandatory,
        fieldData,
        startDate,
        endDate
      })
    );


    setUserType('');
    setFieldType('');
    setFieldName('');
    setFieldDataType('string');
    setFieldMaxLength('');
    setMandatory('yes');
    setFieldData([]);
    setShowFieldOptions(false);
  };

  return (
    <div className='mainDiv'>
      <h1>Dynamic data collection</h1>
      <div>
        <label>User Type</label>
        <br></br>
        <select className='drop1' value={userType} onChange={(e) => setUserType(e.target.value)}
          style={{ background: "#253858", borderRadius: "5px", padding: '10px 20px', color: "white" }}>
          <option value="">Select User Type</option>
          <option value="Student">Student</option>
          <option value="Self-Employee">Self-Employee</option>
          <option value="Business">Business</option>
        </select>
      </div>
      {fieldCount < 4 && (
        <div>
          <button className='drop1' onClick={handleAddField} style={{ padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Add Field</button>
        </div>
      )}
      {showFieldOptions && (
        <div>
          <div>
            <label >Field Type</label>
            <br />
            <select
              className='drop1'
              value={fieldType}
              onChange={(e) => setFieldType(e.target.value)}
              style={{ background: "#6d777e", borderRadius: "5px", padding: '10px 20px', color: "white" }}
            >
              <option value="">Select Field Type</option>
              <option value="textbox">Text Box</option>
              <option value="dropdown">Drop Down</option>
              <option value="datepicker">Date Picker</option>
            </select>
          </div>
          {fieldType.length > 0 && (
            <div>
              <table className="field-table">
                <thead>
                  <tr>
                    <th>Field Display Name:</th>
                    <th>Field Data Type</th>
                    <th>Validation</th>
                    <th>Mandatory</th>
                    <th>Field Data</th>
                  </tr>
                </thead>
                <tbody>

                  <tr >
                    <td><input
                      type="text"
                      placeholder="Field Display Name"
                      value={fieldName}
                      onChange={(e) => setFieldName(e.target.value)}
                    /></td>
                    <td><select
                      value={fieldDataType}
                      onChange={(e) => setFieldDataType(e.target.value)}
                    >
                      {/* <option value="string">Select data type</option> */}
                      <option value="string">String</option>
                      <option value="number">Number</option>
                      <option value="date">Date</option>
                    </select></td>
                    {(fieldDataType === "string" || fieldDataType === "number") && <td><input
                      type="text"
                      placeholder="Field Max Length Allowed"
                      value={fieldMaxLength}
                      onChange={(e) => setFieldMaxLength(e.target.value)}
                    /></td>}
                    {fieldDataType === "date" && <td>
                      <div>
                        <label>Start Date:</label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          dateFormat="yyyy-MM-dd"
                        />
                        <label>End Date:</label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          dateFormat="yyyy-MM-dd"
                        />
                      </div>
                    </td>}
                    <td><select
                      value={mandatory}
                      onChange={(e) => setMandatory(e.target.value)}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select></td>
                    {(fieldType === "textbox" || fieldType === "datepicker") && <td><input
                      type="text"
                      placeholder="Field Data"
                      value={fieldData}
                      onChange={handleFieldDataChange}
                    /></td>}
                    {fieldType === "dropdown" && <td>
                      <input
                        type="text"
                        placeholder="Field Data (Separate values by commas)"
                        value={fieldData.join(',')}
                        onChange={(e) => setFieldData(e.target.value.split(','))}
                      />
                    </td>}
                  </tr>

                </tbody>
              </table>
              <button onClick={handleConfirmField}>Confirm</button>
            </div>
          )}
          {/* <DisplayFields/> */}

        </div>

      )}
    </div>
  );
}

export default Form;
