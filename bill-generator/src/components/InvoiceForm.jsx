import { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS, FALLBACK_API_ENDPOINTS } from '../config/api';

const emptyItem = { description: '', quantity: 1, price: 0 };

export default function InvoiceForm({ onGenerate }) {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [rating, setRating] = useState(5);
  const [disclaimer, setDisclaimer] = useState('Thank you for your business!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleItemChange = (idx, field, value) => {
    setItems(items => items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const addItem = () => setItems([...items, { ...emptyItem }]);
  const removeItem = idx => setItems(items => items.length > 1 ? items.filter((_, i) => i !== idx) : items);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validation
    if (!customerName.trim() || !email.trim() || items.some(item => !item.description.trim() || !item.quantity || !item.price)) {
      setError('Please fill all required fields and add at least one valid item.');
      setLoading(false);
      return;
    }

    const billData = {
      customerName,
      email,
      items,
      rating,
      disclaimer,
      date: new Date().toLocaleDateString(),
    };

    try {
      // Try production server first, fallback to localhost if needed
      let response;
      try {
        response = await axios.post(API_ENDPOINTS.BILLS, billData);
        console.log('Bill saved to production:', response.data);
      } catch (prodError) {
        console.log('Production server unavailable, trying localhost...');
        response = await axios.post(FALLBACK_API_ENDPOINTS.BILLS, billData);
        console.log('Bill saved to localhost:', response.data);
      }
      
      // Update UI
      onGenerate(billData);
      
      // Reset form
      setCustomerName('');
      setEmail('');
      setItems([{ ...emptyItem }]);
      setRating(5);
      setDisclaimer('Thank you for your business!');
    } catch (err) {
      console.error('Error saving bill:', err);
      setError('Failed to save bill. Please ensure your backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      {error && <div style={{ color: '#ff4d4f', marginBottom: 10, fontWeight: 600 }}>{error}</div>}
      <div className="form-group">
        <label>Customer Name</label>
        <input value={customerName} onChange={e => setCustomerName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Items / Services</label>
        {items.map((item, idx) => (
          <div className="item-row" key={idx}>
            <input
              placeholder="Description"
              value={item.description}
              onChange={e => handleItemChange(idx, 'description', e.target.value)}
              required
            />
            <input
              type="number"
              min="1"
              placeholder="Qty"
              value={item.quantity}
              onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))}
              required
              style={{ width: 60 }}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              value={item.price}
              onChange={e => handleItemChange(idx, 'price', Number(e.target.value))}
              required
              style={{ width: 80 }}
            />
            <button type="button" onClick={() => removeItem(idx)} disabled={items.length === 1}>&times;</button>
          </div>
        ))}
        <button type="button" onClick={addItem} className="add-item-btn">+ Add Item</button>
      </div>
      <div className="form-group">
        <label>Rating</label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[1,2,3,4,5].map(star => (
            <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Disclaimer / Notes</label>
        <textarea value={disclaimer} onChange={e => setDisclaimer(e.target.value)} rows={2} />
      </div>
      <button type="submit" className="generate-btn" disabled={loading}>
        {loading ? 'Saving...' : 'Generate Invoice'}
      </button>
    </form>
  );
} 