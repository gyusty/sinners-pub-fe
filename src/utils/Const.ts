import { Table, TableHeader, Item } from "./Interfaces";

export const tableList: Table[] = [
  { id: 1, name: "Table 1", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 2, name: "Table 2", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 3, name: "Table 3", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 4, name: "Table 4", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 5, name: "Table 5", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 6, name: "Table 6", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 7, name: "Table 7", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 8, name: "Table 8", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 9, name: "Table 9", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 10, name: "Table 10", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 11, name: "Table 11", totalAmount: 0, isEmpty: true, checkList: [] },
  { id: 12, name: "Table 12", totalAmount: 0, isEmpty: true, checkList: [] },
];

export const tableStockHeader: TableHeader[] = [
  { displayName: "Product", key: "name" as keyof Item },
  { displayName: "Price", key: "unit_price" as keyof Item },
  { displayName: "Quantity", key: "quantity" as keyof Item },
];
