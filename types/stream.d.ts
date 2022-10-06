export interface ReqBody {
  type: string;
  payload?: any;
  from?: string;
}

export interface CustomEvent extends Event {
  detail?: string;
}
