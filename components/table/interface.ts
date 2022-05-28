export interface LKTable {
  wrapperClassName?: string;
  styles?: React.CSSProperties;
  size?: 'mini' | 'middle' | 'large';
  pagination?: {
    current: number;
    pageSize?: number;
    total?: number;
    onChange: (page: number) => void;
  };
  customGroupHeader?: (
    data: StoreKeyValue,
    originNode: (nodeTitle: React.ReactNode) => React.ReactNode,
  ) => React.ReactNode;
  // customIndexCol?: (originNode: React.ReactNode) => React.ReactNode;
  // extraCol?: (pageData: any[], page: number) => React.ReactNode;
  fixedHeader?: boolean;
}

export interface LKTablePro {
  columns: ColumnItem[];
  dataSource: any[]; // 表格数据源
  showIndex?: boolean;
  fixedSize?: number; // 固定滚动列数
  colSummaryData?: any;
  rowSummaryCol?: RowSummaryCol[]; // 行总计独立column信息
  zebraStripe?: boolean;
  bordered?: boolean;
}

export type SortType = 'desc' | 'asc' | undefined | 'none';

export type SortFn = ((a: any, b: any) => any) | null | undefined;

export type CellRenderProps = ColumnItem & {
  [name: string]: any;
  cellData: any;
  rowData: any; // 此行的数据
  rowIndex: number; // 当前的行数
  pageData: any[]; // 本页的数据
  cellType: 'data' | 'header'; // 单元格类型
};

export type CellRender = (
  data: CellRenderProps,
  originNode: (text?: string | number | React.ReactNode) => React.ReactNode | Element,
) => React.ReactNode;

export interface LeafItem extends ColumnItem {
  $_groupIndex: number;
}

export interface ColumnItem {
  [name: string]: any;
  title: string;
  align?: 'left' | 'right' | 'center';
  dataIndex?: number; // 所在数据集的列索引
  dataKey?: string; // 如果字段存在则会取当前row对应key数据
  id?: string;
  defaultSortOrder?: SortType;
  width?: string;
  render?: CellRender;
  headerRender?: CellRender;
  sorter?: SortFn;
  children?: ColumnItem[];
  mergeRow?: boolean; // 行合并
  mergeVerticalCenter?: boolean; // 行合并后居中单元格显示
  mergeAlignPrevCol?: boolean; // 行合并后单元格与前一列对齐
}

export type RowSummaryCol = ColumnItem & {};
