import Table from '../ui/table';
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

export interface CreateFormProps {
  onDataChange: (data: Loan | null) => void;
}

export interface TableProps {
  loanData: {
    amount: number;
    interest: number;
    term: number;
    date: string;
  } | null,
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
