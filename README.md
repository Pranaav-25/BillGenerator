# Bill Generator

A simple bill/invoice generator application with a clean, modern interface.

## Features

- Create professional invoices with customer details
- Add multiple items with descriptions, quantities, and prices
- Automatic total calculation
- Rating system (1-5 stars)
- Custom disclaimer/notes
- PDF export functionality
- Responsive design for mobile and desktop
- Data persistence with MongoDB backend
- **Production deployment** with automatic fallback to local development

## Tech Stack

### Frontend
- React 19
- Vite
- Axios for API calls
- jsPDF for PDF generation
- html2canvas for PDF conversion

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- **Deployed on Render**: [https://billgenerator-ht14.onrender.com](https://billgenerator-ht14.onrender.com)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your MongoDB URI:
   ```
   MONGO_URI=mongodb://localhost:27017/bill-generator
   ```
   Or for MongoDB Atlas:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bill-generator
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run on port 5000.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd bill-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on port 5173.

## Production Deployment

The backend is deployed on Render and accessible at:
**https://billgenerator-ht14.onrender.com**

The frontend automatically:
- Uses the production API in production builds
- Falls back to localhost during development
- Handles production server unavailability gracefully

## Usage

1. Fill in the customer name and email
2. Add items with descriptions, quantities, and prices
3. Set a rating (optional)
4. Add custom disclaimer/notes (optional)
5. Click "Generate Invoice" to save and preview
6. Use "Print as PDF" to download the invoice

## API Endpoints

- `GET /api/bills` - Get all bills
- `POST /api/bills` - Create a new bill
- `GET /api/bills/:id` - Get a specific bill by ID

## Configuration

The API configuration is centralized in `src/config/api.js`:
- Automatically switches between development and production URLs
- Includes fallback logic for server unavailability
- Easy to modify for different environments

## Project Structure

```
BillGenerator/
├── backend/
│   ├── config/
│   │   └── db.js
│   │   └── api.js
│   ├── models/
│   │   └── Bill.js
│   ├── routes/
│   │   └── bills.js
│   ├── server.js
│   └── package.json
└── bill-generator/
    ├── src/
    │   ├── components/
    │   │   ├── InvoiceForm.jsx
    │   │   └── InvoiceDisplay.jsx
    │   ├── config/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    └── package.json
```

## License

MIT 