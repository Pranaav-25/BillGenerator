import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function InvoiceDisplay({ invoiceData }) {
  if (!invoiceData) return <div style={{ color: '#888' }}>Fill the form and generate an invoice to preview it here.</div>;

  const { customerName, email, items, rating, disclaimer, date } = invoiceData;
  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  const handlePrint = async () => {
    const input = document.getElementById('invoice-preview');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${customerName.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div>
      <div id="invoice-preview" className="invoice-preview" style={{ background: '#fff', padding: 24, borderRadius: 8, maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 16 }}>Invoice</h2>
        <div style={{ marginBottom: 8 }}><strong>Customer:</strong> {customerName}</div>
        <div style={{ marginBottom: 8 }}><strong>Email:</strong> {email}</div>
        <div style={{ marginBottom: 16 }}><strong>Date:</strong> {date}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 16 }}>
          <thead>
            <tr style={{ background: '#f0f2f5' }}>
              <th style={{ padding: 8, border: '1px solid #eee' }}>Description</th>
              <th style={{ padding: 8, border: '1px solid #eee' }}>Quantity</th>
              <th style={{ padding: 8, border: '1px solid #eee' }}>Price</th>
              <th style={{ padding: 8, border: '1px solid #eee' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td style={{ padding: 8, border: '1px solid #eee' }}>{item.description}</td>
                <td style={{ padding: 8, border: '1px solid #eee', textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ padding: 8, border: '1px solid #eee', textAlign: 'right' }}>{item.price.toFixed(2)}</td>
                <td style={{ padding: 8, border: '1px solid #eee', textAlign: 'right' }}>{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'right', fontWeight: 'bold', marginBottom: 16 }}>
          Total: ₹{total.toFixed(2)}
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Rating:</strong> {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </div>
        <div style={{ fontSize: 13, color: '#555', borderTop: '1px solid #eee', paddingTop: 8, marginTop: 12 }}>
          {disclaimer}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <button onClick={handlePrint} className="print-btn">Print as PDF</button>
      </div>
    </div>
  );
} 