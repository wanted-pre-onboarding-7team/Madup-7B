export interface IRootObject {
  report: IReport;
}

interface IReport {
  daily: IDaily[];
}

export interface IDaily {
  imp: number;
  click: number;
  cost: number;
  conv: number;
  convValue: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
  roas: number;
  date: string;
}
