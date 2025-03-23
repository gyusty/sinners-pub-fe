import { useEffect, useState } from "react";
import { Order, Table } from "../utils/Interfaces";

interface TableCardProps {
  table: Table;
}

const TableCard: React.FC<TableCardProps> = ({ table }) => {
  const [totalAmout, setTotalAmout] = useState(0);

  useEffect(() => {
    let totalCheck = 0;

    table.checkList.forEach((check) => {
      if (!check.isPaid) {
        totalCheck += calculateCheckTotal(check);
      }
    });

    setTotalAmout(totalCheck);
  }, []);

  const calculateCheckTotal = (check: Order) => {
    return check.itemList.reduce(
      (total, item) => total + (item.unit_price ?? 0) * item.quantity,
      0
    );
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-md w-full flex-initial cursor-pointer hover:border-blue-500 hover:bg-gray-100 hover:shadow-md transition-colors duration-300">
      <h2 className="text-lg font-semibold">{table.name}</h2>
      <ul>
        {table.checkList?.map((item) => (
          <li key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={item.isPaid}
              readOnly
              className="mr-2"
            />
            <span>{item.details}</span>
          </li>
        ))}
      </ul>
      <p className="font-medium">{totalAmout}</p>
    </div>
  );
};

export default TableCard;
