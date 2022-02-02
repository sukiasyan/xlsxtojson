import { useState } from 'react';
import xlsx from 'xlsx';
import './App.css';

function App() {
  const [output, setOutput] = useState([]);
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);
        setOutput(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Upload csv or xslx file</p>
        <form>
          <label htmlFor='upload'>Upload File</label> &nbsp;
          <input
            type='file'
            name='upload'
            id='upload'
            onChange={readUploadFile}
          />
        </form>
        <div className='stock-container'></div>

        {/* name, address, country is only for testing purpose and only for my csv: just change items */}
        {output.map(
          (item) =>
            `Name: ${item.name}\n
        address: ${item.address}
        country: ${item.country}
        `
        )}
      </header>
    </div>
  );
}

export default App;
