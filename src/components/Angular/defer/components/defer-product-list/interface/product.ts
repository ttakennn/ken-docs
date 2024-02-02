export interface Product {
  uid: number;
  name: string;
  color: string;
  price: number;
  description: string;
  thumbnailUrl: string;
}

export interface PaginationProduct<T> {
  pagination: {
    _limit: number;
    _pape: number;
    _totalRows: number;
  };
  data: T[];
}
