export interface Payment {
  year: number;
  month: number;
  monthName?: string;
  principal: number;
  interest: number;
  total: number;
  balance: number;
  percentagePaid: number;
}
export interface TableProps {
  data: Record<number, Payment[]>
}

export interface CreateFormProps {
  onDataChange: (data: Loan | null) => void;
}

export type Loan = {
  amount: number;
  interest: number;
  term: number;
  date: string;
};

export type PagoPorAno = {
  month: number;
  principal: number;
  interest: number;
  total: number;
  balance: number;
  percentagePaid: number;
};
