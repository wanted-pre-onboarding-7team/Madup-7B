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
