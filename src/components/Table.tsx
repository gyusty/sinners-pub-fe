import { Item, TableHeader } from "../utils/Interfaces";

interface TableProps {
  headers: TableHeader[];
  body?: Array<Item>;
}

const Table: React.FC<TableProps> = ({ headers, body }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700 border border-gray-300"
              >
                {header.displayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body && body.length > 0 ? (
            body.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {headers.map((header, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300"
                  >
                    {row[header.key] || ""}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length}
                className="px-4 py-2 text-center text-sm text-gray-600 border border-gray-300"
              >
                There is no products added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
