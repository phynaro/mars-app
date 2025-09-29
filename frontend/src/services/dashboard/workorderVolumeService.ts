import authService from '@/services/authService';

export interface WorkOrderVolumeItem {
  companyYear: number;
  periodNo: number;
  woCount: number;
  hasWR: number;
  history: number;
  canceled: number;
  closeToHistory: number;
  finish: number;
  inProgress: number;
  scheduled: number;
  planResource: number;
  workInitiated: number;
  hasWR_OnTime: number;
  hasWR_Late: number;
  onTimeRatePct: number;
  downtime: number;
}

export interface PersonalWorkOrderVolumeItem {
  assigneeId: number;
  assignee: string;
  woCount: number;
  hasWR: number;
  history: number;
  canceled: number;
  closeToHistory: number;
  finish: number;
  inProgress: number;
  scheduled: number;
  planResource: number;
  workInitiated: number;
  created: number;
  hasWR_OnTime: number;
  hasWR_Late: number;
  onTimeRatePct: number;
  downtime: number;
}

export interface PersonalWorkOrderVolumeByPeriodItem {
  assigneeId: number;
  assignee: string;
  companyYear: number;
  periodNo: number;
  woCount: number;
  hasWR: number;
  history: number;
  canceled: number;
  closeToHistory: number;
  finish: number;
  inProgress: number;
  scheduled: number;
  planResource: number;
  workInitiated: number;
  created: number;
  hasWR_OnTime: number;
  hasWR_Late: number;
  onTimeRatePct: number;
  downtime: number;
}

export interface WorkOrderVolumeFilters {
  assignees: Array<{ id: number; name: string }>;
  woTypes: Array<{ id: number; code?: string; name: string }>;
  departments: Array<{ id: number; code?: string; name: string }>;
  productionUnits: Array<{ id: number; name: string }>;
  companyYears: number[];
}

export interface WorkOrderVolumeResponse {
  success: boolean;
  data: {
    statistics: WorkOrderVolumeItem[];
    summary: {
      totalRecords: number;
      totalWorkOrders: number;
      totalWithWR: number;
      totalOnTime: number;
      totalLate: number;
      totalDowntime: number;
      completionRate: number;
      onTimeRate: number;
      appliedFilters: {
        companyYear?: number;
        assignee?: string;
        woTypeNo?: string;
        deptno?: string;
        puno?: string;
      };
    };
  };
}

export interface WorkOrderVolumeFilterOptionsResponse {
  success: boolean;
  data: {
    filters: WorkOrderVolumeFilters;
    appliedFilters: {
      companyYear?: number;
      assignee?: string;
      woTypeNo?: string;
      deptno?: string;
      puno?: string;
    };
  };
}

export interface PersonalWorkOrderVolumeResponse {
  success: boolean;
  data: {
    statistics: PersonalWorkOrderVolumeItem[];
    summary: {
      totalRecords: number;
      totalWorkOrders: number;
      totalWithWR: number;
      totalOnTime: number;
      totalLate: number;
      totalDowntime: number;
      appliedFilters: {
        companyYear?: number;
        assignee?: string;
        woTypeNo?: string;
        deptno?: string;
        puno?: string;
      };
    };
  };
}

export interface PersonalWorkOrderVolumeByPeriodResponse {
  success: boolean;
  data: {
    statistics: PersonalWorkOrderVolumeByPeriodItem[];
    summary: {
      totalRecords: number;
      totalWorkOrders: number;
      totalWithWR: number;
      totalOnTime: number;
      totalLate: number;
      totalDowntime: number;
      appliedFilters: {
        companyYear?: number;
        assignee?: string;
        woTypeNo?: string;
        deptno?: string;
        puno?: string;
      };
    };
  };
}

export interface CurrentCompanyYearResponse {
  success: boolean;
  data: {
    currentCompanyYear: number;
    today: string;
    timestamp: string;
  };
}

const baseURL = `${(import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')}/dashboard`;

export async function getCurrentCompanyYear(): Promise<CurrentCompanyYearResponse> {
  const res = await fetch(`${baseURL}/current-company-year`, {
    headers: authService.getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Failed to fetch current company year');
  return res.json();
}

export async function getWorkOrderVolume(params: {
  companyYear?: number | null;
  assignee?: string | number | null;
  woTypeNo?: string | number | null;
  deptno?: string | number | null;
  puno?: string | number | null;
}): Promise<WorkOrderVolumeResponse> {
  const url = new URL(`${baseURL}/workorder-volume`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), { headers: authService.getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch work order volume');
  return res.json();
}

export async function getWorkOrderVolumeFilterOptions(params: {
  companyYear?: number | null;
  assignee?: string | number | null;
  woTypeNo?: string | number | null;
  deptno?: string | number | null;
  puno?: string | number | null;
}): Promise<WorkOrderVolumeFilterOptionsResponse> {
  const url = new URL(`${baseURL}/workorder-volume/filter-options`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), { headers: authService.getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch filter options');
  return res.json();
}

export async function getPersonalWorkOrderVolume(params: {
  companyYear?: number | null;
  assignee?: string | number | null;
  woTypeNo?: string | number | null;
  deptno?: string | number | null;
  puno?: string | number | null;
}): Promise<PersonalWorkOrderVolumeResponse> {
  const url = new URL(`${baseURL}/workorder-volume/personal`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), { headers: authService.getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch personal work order volume');
  return res.json();
}

export async function getPersonalWorkOrderVolumeByPeriod(params: {
  companyYear?: number | null;
  assignee?: string | number | null;
  woTypeNo?: string | number | null;
  deptno?: string | number | null;
  puno?: string | number | null;
}): Promise<PersonalWorkOrderVolumeByPeriodResponse> {
  const url = new URL(`${baseURL}/workorder-volume/personal/period`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), { headers: authService.getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch personal work order volume by period');
  return res.json();
}

export default {
  getCurrentCompanyYear,
  getWorkOrderVolume,
  getWorkOrderVolumeFilterOptions,
  getPersonalWorkOrderVolume,
  getPersonalWorkOrderVolumeByPeriod,
};
