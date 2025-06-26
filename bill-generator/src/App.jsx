import { useState } from 'react';
import './App.css';
import InvoiceForm from './components/InvoiceForm';
import InvoiceDisplay from './components/InvoiceDisplay';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleGenerateInvoice = (data) => {
    setInvoiceData(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bill Generator</h1>
      </header>
      <div className="container">
        <div className="form-section">
          <InvoiceForm onGenerate={handleGenerateInvoice} />
        </div>
        <div className="preview-section">
          <InvoiceDisplay invoiceData={invoiceData} />
        </div>
      </div>
    </div>
  );
}

export default App;
