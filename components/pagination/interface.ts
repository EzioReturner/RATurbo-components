export interface PaginationProps {
  total: number; // 总页数
  pageSize?: number; // 一页行数
  current?: number; // 当前页数
  onChange?: (current: number) => void;
}
