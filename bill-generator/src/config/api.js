// API Configuration
const isDevelopment = import.meta.env.DEV;

// Use localhost in development, production URL in production
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000' 
  : 'https://billgenerator-ht14.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  BILLS: `${API_BASE_URL}/api/bills`,
};

// Fallback configuration for when production is unavailable
export const FALLBACK_API_BASE_URL = 'http://localhost:5000';
export const FALLBACK_API_ENDPOINTS = {
  BILLS: `${FALLBACK_API_BASE_URL}/api/bills`,
}; 