export interface IRoot {
  count: number;
  ads: IAd[];
}

export interface IReport {
  cost: number;
  convValue: number;
  roas: number;
}

export interface IAd {
  id: number;
  adType: string;
  title: string;
  budget: number;
  status: string;
  startDate: string;
  endDate: string | null;
  report: IReport;
}

export interface IfilterList {
  channel: string;
  date?: string;
  imp: number;
  click: number;
  cost: number;
  convValue: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
  roas: number;
}

export interface IaddRevenueType extends IfilterList {
  revenue: number;
}
