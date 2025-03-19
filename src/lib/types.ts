// Type definitions for FIFA API

export interface Player {
  id: number;
  name: string;
  overall: number;
  potential: number;
  club: string;
  position: string;
  nationality: string;
  height: number;
  // Add more player attributes as needed
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    }
  }
} 