import React, { useEffect } from "react";
import TrashIcon from "../utils/icons/TrashIcon";
import { Item } from "../utils/Interfaces";

interface RoundTableProps {
  itemList: Item[];
  removeItem: (index: number) => void;
}

const RoundTable: React.FC<RoundTableProps> = ({ itemList, removeItem }) => {
  useEffect(() => {
    console.log(itemList);
  }, [itemList]);

  return (
    <table className="w-full border-collapse">
      <tbody>
        {itemList.map((item, index) => (
          <tr key={item.name} className="border-b">
            <td className="p-2">{item.name}</td>
            <td className="p-2 text-center">X</td>
            <td className="p-2 text-right">
              {item.quantity} {item.canUpdate}
            </td>
            {item.canUpdate && (
              <td className="p-2 text-right">
                <TrashIcon
                  className="size-6 text-red-500 cursor-pointer"
                  onClick={() => removeItem(index)}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoundTable;
