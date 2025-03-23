export interface Table {
  id: number;
  name: string;
  totalAmount: number;
  isEmpty: boolean;
  checkList: Order[];
}

export interface Order {
  id?: string;
  owner: string;
  itemList: Item[];
  total?: number;
  isPaid?: boolean;
  details?: string;
}

export interface Item {
  quantity: number;
  name: string;
  unit_price?: number;
  canUpdate?: boolean;
}

export interface TableHeader {
  displayName: string;
  key: keyof Item;
}

export interface Round {
  itemList: Item[];
}
