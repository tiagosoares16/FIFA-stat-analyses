// FIFA API Integration
// Using proxy to avoid CORS issues
const API_BASE_URL = '/api';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_FIFA_API_KEY || '';

// Import types from separate file
import type { Player, ApiResponse } from './types';

// Helper function to construct query parameters
const buildQueryParams = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });
  
  return queryParams.toString();
};

// Request headers with authentication token
const getRequestHeaders = () => {
  return {
    'accept': 'application/json',
    'X-AUTH-TOKEN': API_KEY
  };
};

// API service functions
export const api = {
  async getPlayers(filters: Record<string, any> = {}, page = 1): Promise<ApiResponse<Player[]>> {
    const params = { ...filters, page };
    const queryParams = buildQueryParams(params);
    
    try {
      const response = await fetch(`${API_BASE_URL}/players?${queryParams}`, {
        headers: getRequestHeaders(),
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch players: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  
  async getAllPlayers(filters: Record<string, any> = {}): Promise<Player[]> {
    let allPlayers: Player[] = [];
    let currentPage = 1;
    let totalPages = 1;
    
    do {
      try {
        const response = await this.getPlayers(filters, currentPage);
        
        if (response && response.data) {
          allPlayers = [...allPlayers, ...response.data];
          
          // Update pagination info if available
          if (response.meta?.pagination?.total_pages) {
            totalPages = response.meta.pagination.total_pages;
          }
          currentPage++;
        } else {
          break; // Exit if invalid response
        }
        
        // Small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Error fetching page ${currentPage}:`, error);
        break;
      }
    } while (currentPage <= totalPages);
    
    return allPlayers;
  },
  
  async getPlayerById(id: number): Promise<Player> {
    try {
      const response = await fetch(`${API_BASE_URL}/players/${id}`, {
        headers: getRequestHeaders(),
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch player with ID ${id}: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  
  async getTrendingPlayers(): Promise<ApiResponse<Player[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/trending-players`, {
        headers: getRequestHeaders(),
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch trending players: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  
  async getTransfers(): Promise<ApiResponse<Player[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/transfers`, {
        headers: getRequestHeaders(),
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch transfers: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  },
  
  async getFreeAgents(): Promise<ApiResponse<Player[]>> {
    return this.getPlayers({ club: 'free_agent' });
  },
  
  async getLoanPlayers(): Promise<ApiResponse<Player[]>> {
    return this.getPlayers({ loan_listed: true });
  }
}; 