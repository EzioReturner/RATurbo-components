import React from 'react';
import { LKTable, LKTablePro, SortType } from '../interface';

export interface BodyContextProps extends LKTable, LKTablePro {
  pageSize: number;
  page: number;
  pageData: any[];
  handleChangeSort: Function;
  sortArr: SortType[];
}

const BodyContext = React.createContext<StoreKeyValue>({});

export default BodyContext;
