import authService from './authService';

export type GroupBy = 'daily' | 'weekly' | 'period';

export interface TrendPoint {
  date: string;
  count: number;
  periodStart?: string;
  periodEnd?: string;
  year?: number;
  week?: number;
  month?: number;
}

export interface FilterOption { id: number; code?: string; name?: string }

export interface WorkOrderTrendResponse {
  success: boolean;
  data: {
    trend: TrendPoint[];
    filters: {
      woTypes: FilterOption[];
      departments: FilterOption[];
      sites: FilterOption[];
    };
    periodInfo: Record<string, {
      firstSunday: string;
      periods: Array<{
        period: number;
        startDate: string;
        endDate: string;
        label: string;
      }>;
    }>;
    summary: {
      totalWorkOrders: number;
      dateRange: { start: string | null; end: string | null };
      groupBy: GroupBy;
      appliedFilters: Record<string, any>;
    };
  };
}

export interface TopPerformer {
  personno: number;
  personName: string;
  avatarUrl?: string;
  ticketCount?: number;
  totalSavings?: number;
  totalDowntimeSaved?: number;
}

export interface AreaData {
  id: number;
  name: string;
  code: string;
  description?: string;
  plant_id: number;
  is_active: boolean;
  plant_name?: string;
  plant_code?: string;
}

export interface ComparisonMetric {
  percentage: number;
  type: 'no_change' | 'new_activity' | 'activity_stopped' | 'increase' | 'decrease';
  description: string;
}

export interface AbnormalFindingKPIResponse {
  success: boolean;
  data: {
    kpis: {
      totalTicketsThisPeriod: number;
      totalTicketsLastPeriod: number;
      closedTicketsThisPeriod: number;
      closedTicketsLastPeriod: number;
      pendingTicketsThisPeriod: number;
      pendingTicketsLastPeriod: number;
      totalDowntimeAvoidanceThisPeriod: number;
      totalDowntimeAvoidanceLastPeriod: number;
      totalCostAvoidanceThisPeriod: number;
      totalCostAvoidanceLastPeriod: number;
    };
    topPerformers: {
      topReporter: TopPerformer | null;
      topCostSaver: TopPerformer | null;
      topDowntimeSaver: TopPerformer | null;
    };
    periodInfo: {
      currentPeriod: {
        startDate: string;
        endDate: string;
      };
      lastPeriod: {
        startDate: string;
        endDate: string;
      } | null;
    };
    summary: {
      appliedFilters: {
        startDate: string;
        endDate: string;
        compare_startDate?: string;
        compare_endDate?: string;
        area_id?: number;
      };
      comparisonMetrics: {
        ticketGrowthRate: ComparisonMetric;
        closureRateImprovement: ComparisonMetric;
        costAvoidanceGrowth: ComparisonMetric;
        downtimeAvoidanceGrowth: ComparisonMetric;
      };
    };
  };
}

export interface ParticipationDataPoint {
  period: string;
  tickets: number;
  target: number;
  uniqueReporters: number;
  coverageRate: number;
}

export interface TicketsCountPerPeriodResponse {
  success: boolean;
  data: {
    participationData: ParticipationDataPoint[];
    summary: {
      totalTickets: number;
      totalUniqueReporters: number;
      averageTarget: number;
      appliedFilters: {
        year: number;
        area_id: number | null;
      };
    };
  };
}

export interface AreaActivityDataPoint {
  area_id: number;
  area_name: string;
  area_code: string;
  tickets: number;
}

export interface AreaActivityResponse {
  success: boolean;
  data: {
    areaActivityData: AreaActivityDataPoint[];
    summary: {
      totalAreas: number;
      totalTickets: number;
      averageTicketsPerArea: number;
      appliedFilters: {
        year: number;
      };
    };
  };
}

export interface UserActivityDataPoint {
  id: string;
  user: string;
  tickets: number;
  initials: string;
  bgColor: string;
  avatar?: string;
}

export interface UserActivityResponse {
  success: boolean;
  data: {
    userActivityData: UserActivityDataPoint[];
    summary: {
      totalUsers: number;
      totalTickets: number;
      averageTicketsPerUser: number;
      appliedFilters: {
        startDate: string;
        endDate: string;
        area_id: number | null;
      };
    };
  };
}

export interface CalendarHeatmapDataPoint {
  date: string;
  count: number;
}

export interface CalendarHeatmapResponse {
  success: boolean;
  data: {
    calendarData: CalendarHeatmapDataPoint[];
    summary: {
      totalDays: number;
      daysWithTickets: number;
      totalTickets: number;
      maxTicketsPerDay: number;
      appliedFilters: {
        year: number;
        area_id: number | null;
      };
    };
  };
}

export interface DowntimeTrendDataPoint {
  period: string;
  [key: string]: string | number; // Dynamic area names as keys
}

export interface DowntimeAvoidanceTrendResponse {
  success: boolean;
  data: {
    downtimeTrendData: DowntimeTrendDataPoint[];
    summary: {
      totalPeriods: number;
      totalAreas: number;
      areas: string[];
      appliedFilters: {
        year: number;
      };
    };
  };
}

export interface CostAvoidanceDataPoint {
  period: string;
  costAvoidance: number;
  costPerCase: number;
  ticketCount: number;
}

export interface CostAvoidanceResponse {
  success: boolean;
  data: {
    costAvoidanceData: CostAvoidanceDataPoint[];
    summary: {
      totalPeriods: number;
      totalCostAvoidance: number;
      totalTickets: number;
      appliedFilters: {
        year: number;
        area_id: number | null;
      };
    };
  };
}

export interface DowntimeImpactDataPoint {
  area: string;
  hours: number;
  ticketCount: number;
}

export interface DowntimeImpactLeaderboardResponse {
  success: boolean;
  data: {
    downtimeImpactData: DowntimeImpactDataPoint[];
    summary: {
      totalAreas: number;
      totalDowntimeHours: number;
      totalTickets: number;
      appliedFilters: {
        startDate: string;
        endDate: string;
      };
    };
  };
}

export interface CostImpactDataPoint {
  area: string;
  cost: number;
  ticketCount: number;
}

export interface CostImpactLeaderboardResponse {
  success: boolean;
  data: {
    costImpactData: CostImpactDataPoint[];
    summary: {
      totalAreas: number;
      totalCostAvoidance: number;
      totalTickets: number;
      appliedFilters: {
        startDate: string;
        endDate: string;
      };
    };
  };
}

export interface OntimeRateByAreaDataPoint {
  areaCode: string;
  ontimeRate: number;
  totalCompleted: number;
  ontimeCompleted: number;
}

export interface OntimeRateByAreaResponse {
  success: boolean;
  data: {
    ontimeRateByAreaData: OntimeRateByAreaDataPoint[];
    summary: {
      totalAreas: number;
      totalCompleted: number;
      totalOntimeCompleted: number;
      overallOntimeRate: number;
    };
  };
}

export interface OntimeRateByUserDataPoint {
  id: string;
  userName: string;
  initials: string;
  bgColor: string;
  avatar: string | null;
  ontimeRate: number;
  totalCompleted: number;
  ontimeCompleted: number;
}

export interface OntimeRateByUserResponse {
  success: boolean;
  data: {
    ontimeRateByUserData: OntimeRateByUserDataPoint[];
    summary: {
      totalUsers: number;
      totalCompleted: number;
      totalOntimeCompleted: number;
      overallOntimeRate: number;
    };
  };
}

export interface TicketResolveDurationByUserDataPoint {
  id: string;
  userName: string;
  initials: string;
  bgColor: string;
  avatar: string | null;
  avgResolveHours: number;
  ticketCount: number;
}

export interface TicketResolveDurationByUserResponse {
  success: boolean;
  data: {
    resolveDurationByUserData: TicketResolveDurationByUserDataPoint[];
    summary: {
      totalUsers: number;
      totalTickets: number;
      overallAvgResolveHours: number;
    };
  };
}

export interface TicketResolveDurationByAreaDataPoint {
  areaCode: string;
  avgResolveHours: number;
  ticketCount: number;
}

export interface TicketResolveDurationByAreaResponse {
  success: boolean;
  data: {
    resolveDurationByAreaData: TicketResolveDurationByAreaDataPoint[];
    summary: {
      totalAreas: number;
      totalTickets: number;
      overallAvgResolveHours: number;
    };
  };
}

export interface CostByFailureModeDataPoint {
  failureModeCode: string;
  failureModeName: string;
  cost: number;
  caseCount: number;
}

export interface CostByFailureModeResponse {
  success: boolean;
  data: {
    costByFailureModeData: CostByFailureModeDataPoint[];
    summary: {
      totalFailureModes: number;
      totalCostAvoidance: number;
      totalCases: number;
      averageCostPerMode: number;
    };
  };
}

export interface DowntimeByFailureModeDataPoint {
  failureModeCode: string;
  failureModeName: string;
  downtime: number;
  caseCount: number;
}

export interface DowntimeByFailureModeResponse {
  success: boolean;
  data: {
    downtimeByFailureModeData: DowntimeByFailureModeDataPoint[];
    summary: {
      totalFailureModes: number;
      totalDowntimeHours: number;
      totalCases: number;
      averageDowntimePerMode: number;
    };
  };
}

export interface CostImpactReporterDataPoint {
  id: string;
  reporter: string;
  cost: number;
  initials: string;
  bgColor: string;
  avatar: string | null;
  ticketCount: number;
}

export interface CostImpactReporterLeaderboardResponse {
  success: boolean;
  data: {
    costImpactReporterData: CostImpactReporterDataPoint[];
    summary: {
      totalUsers: number;
      totalCostAvoidance: number;
      averageCostPerUser: number;
    };
  };
}

export interface DowntimeImpactReporterDataPoint {
  id: string;
  reporter: string;
  hours: number;
  initials: string;
  bgColor: string;
  avatar: string | null;
  ticketCount: number;
}

export interface DowntimeImpactReporterLeaderboardResponse {
  success: boolean;
  data: {
    downtimeImpactReporterData: DowntimeImpactReporterDataPoint[];
    summary: {
      totalUsers: number;
      totalDowntimeHours: number;
      totalTickets: number;
      appliedFilters: {
        startDate: string;
        endDate: string;
        area_id: number | null;
      };
    };
  };
}

class DashboardService {
  private baseURL = `${(import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')}/dashboard`;
  private hierarchyURL = `${(import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')}/hierarchy`;

  private headers() { return authService.getAuthHeaders(); }

  async getAllAreas(): Promise<{ success: boolean; data: AreaData[] }> {
    const res = await fetch(`${this.hierarchyURL}/areas`, { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch areas');
    return res.json();
  }

  async getWorkOrderVolumeTrend(params: {
    startDate?: string; // YYYY-MM-DD
    endDate?: string;   // YYYY-MM-DD
    groupBy?: GroupBy;
    woType?: string | number;
    department?: string | number;
    site?: string | number;
    assign?: string | number;
    year?: string | number;
    fromPeriod?: string | number;
    toPeriod?: string | number;
    fromYear?: string | number;
    toYear?: string | number;
  } = {}): Promise<WorkOrderTrendResponse> {
    const url = new URL(`${this.baseURL}/workorder-volume-trend`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch work order volume trend');
    return res.json();
  }

  async getAbnormalFindingKPIs(params: {
    startDate: string; // YYYY-MM-DD (required)
    endDate: string;   // YYYY-MM-DD (required)
    compare_startDate?: string; // YYYY-MM-DD
    compare_endDate?: string;   // YYYY-MM-DD
    area_id?: number;
  }): Promise<AbnormalFindingKPIResponse> {
    const url = new URL(`${this.baseURL}/af`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch abnormal finding KPIs');
    return res.json();
  }

  async getTicketsCountPerPeriod(params: {
    year?: number;
    area_id?: number;
  } = {}): Promise<TicketsCountPerPeriodResponse> {
    const url = new URL(`${this.baseURL}/tickets-count-per-period`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch tickets count per period');
    return res.json();
  }

  async getAreaActivityData(params: {
    year?: number;
  } = {}): Promise<AreaActivityResponse> {
    const url = new URL(`${this.baseURL}/area-activity`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch area activity data');
    return res.json();
  }

  async getUserActivityData(params: {
    startDate: string;
    endDate: string;
    area_id?: number;
  }): Promise<UserActivityResponse> {
    const url = new URL(`${this.baseURL}/user-activity`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch user activity data');
    return res.json();
  }

  async getCalendarHeatmapData(params: {
    year?: number;
    area_id?: number;
  } = {}): Promise<CalendarHeatmapResponse> {
    const url = new URL(`${this.baseURL}/calendar-heatmap`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch calendar heatmap data');
    return res.json();
  }

  async getDowntimeAvoidanceTrend(params: {
    year?: number;
  } = {}): Promise<DowntimeAvoidanceTrendResponse> {
    const url = new URL(`${this.baseURL}/downtime-avoidance-trend`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch downtime avoidance trend data');
    return res.json();
  }

  async getCostAvoidanceData(params: {
    year?: number;
    area_id?: number;
  } = {}): Promise<CostAvoidanceResponse> {
    const url = new URL(`${this.baseURL}/cost-avoidance`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch cost avoidance data');
    return res.json();
  }

  async getDowntimeImpactLeaderboard(params: {
    startDate: string;
    endDate: string;
  }): Promise<DowntimeImpactLeaderboardResponse> {
    const url = new URL(`${this.baseURL}/downtime-impact-leaderboard`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch downtime impact leaderboard data');
    return res.json();
  }

  async getCostImpactLeaderboard(params: {
    startDate: string;
    endDate: string;
  }): Promise<CostImpactLeaderboardResponse> {
    const url = new URL(`${this.baseURL}/cost-impact-leaderboard`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch cost impact leaderboard data');
    return res.json();
  }

  // Get Ontime Rate by Area Data
  async getOntimeRateByArea(params: {
    startDate: string;
    endDate: string;
  }): Promise<OntimeRateByAreaResponse> {
    const url = new URL(`${this.baseURL}/ontime-rate-by-area`);
    url.searchParams.append('startDate', params.startDate);
    url.searchParams.append('endDate', params.endDate);

    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch ontime rate by area data');
    return res.json();
  }

  // Get Ontime Rate by User Data
  async getOntimeRateByUser(params: {
    startDate: string;
    endDate: string;
    area_id: number;
  }): Promise<OntimeRateByUserResponse> {
    const url = new URL(`${this.baseURL}/ontime-rate-by-user`);
    url.searchParams.append('startDate', params.startDate);
    url.searchParams.append('endDate', params.endDate);
    url.searchParams.append('area_id', params.area_id.toString());

    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch ontime rate by user data');
    return res.json();
  }

  // Get Ticket Resolve Duration by User Data
  async getTicketResolveDurationByUser(params: {
    startDate: string;
    endDate: string;
    area_id: number;
  }): Promise<TicketResolveDurationByUserResponse> {
    const url = new URL(`${this.baseURL}/ticket-resolve-duration-by-user`);
    url.searchParams.append('startDate', params.startDate);
    url.searchParams.append('endDate', params.endDate);
    url.searchParams.append('area_id', params.area_id.toString());

    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch ticket resolve duration by user data');
    return res.json();
  }

  // Get Ticket Resolve Duration by Area Data
  async getTicketResolveDurationByArea(params: {
    startDate: string;
    endDate: string;
  }): Promise<TicketResolveDurationByAreaResponse> {
    const url = new URL(`${this.baseURL}/ticket-resolve-duration-by-area`);
    url.searchParams.append('startDate', params.startDate);
    url.searchParams.append('endDate', params.endDate);

    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch ticket resolve duration by area data');
    return res.json();
  }

  // Get Cost Impact by Failure Mode Data
  async getCostImpactByFailureMode(params: {
    startDate: string;
    endDate: string;
    area_id?: number;
  }): Promise<CostByFailureModeResponse> {
    const url = new URL(`${this.baseURL}/cost-impact-by-failure-mode`);
    url.searchParams.append('startDate', params.startDate);
    url.searchParams.append('endDate', params.endDate);
    if (params.area_id !== undefined) {
      url.searchParams.append('area_id', params.area_id.toString());
    }

    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch cost impact by failure mode data');
    return res.json();
  }

  // Get Downtime Impact by Failure Mode Data
  async getDowntimeImpactByFailureMode(params: {
    startDate: string;
    endDate: string;
    area_id?: number;
  }): Promise<DowntimeByFailureModeResponse> {
    const url = new URL(`${this.baseURL}/downtime-impact-by-failure-mode`);
    url.searchParams.append('startDate', params.startDate);
    url.searchParams.append('endDate', params.endDate);
    if (params.area_id !== undefined) {
      url.searchParams.append('area_id', params.area_id.toString());
    }

    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch downtime impact by failure mode data');
    return res.json();
  }

  // Get Cost Impact Reporter Leaderboard Data
  async getCostImpactReporterLeaderboard(params: {
    startDate: string;
    endDate: string;
    area_id?: number;
  }): Promise<CostImpactReporterLeaderboardResponse> {
    const url = new URL(`${this.baseURL}/cost-impact-reporter-leaderboard`);
    url.searchParams.append('startDate', params.startDate);
    url.searchParams.append('endDate', params.endDate);
    if (params.area_id !== undefined) {
      url.searchParams.append('area_id', params.area_id.toString());
    }

    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch cost impact reporter leaderboard data');
    return res.json();
  }

  async getDowntimeImpactReporterLeaderboard(params: {
    startDate: string;
    endDate: string;
    area_id?: number;
  }): Promise<DowntimeImpactReporterLeaderboardResponse> {
    const url = new URL(`${this.baseURL}/downtime-impact-reporter-leaderboard`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, String(v));
    });
    const res = await fetch(url.toString(), { headers: this.headers() });
    if (!res.ok) throw new Error('Failed to fetch downtime impact reporter leaderboard data');
    return res.json();
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;

