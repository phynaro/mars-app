import authService from './authService';

export interface WorkflowType {
  WFTYPENO?: number;
  WFTYPECODE?: string;
  WFTYPENAME?: string;
  [key: string]: any;
}

export interface WorkflowTypesResponse {
  success: boolean;
  message: string;
  data: WorkflowType[];
  count?: number;
}

class WorkflowService {
  private baseURL = `${(import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')}/workflow`;

  private async headers() {
    return authService.getAuthHeaders();
  }

  async getTypes(): Promise<WorkflowTypesResponse> {
    const res = await fetch(`${this.baseURL}/types`, { headers: await this.headers() });
    if (!res.ok) throw new Error('Failed to fetch workflow types');
    return res.json();
  }
}

export const workflowService = new WorkflowService();
export default workflowService;

