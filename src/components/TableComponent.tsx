import React from "react";

interface TableComponentProps {
  data: { id: number; title?: string; name?: string }[];
  columns: string[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-5 w-full">
      <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold">Displaying Content</h2>
      <table className="min-w-full table-auto mt-4 border-[1px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 pl-12 text-left text-sm font-medium text-gray-600 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id}
              className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <td className="px-4 py-3 text-sm  text-gray-700 pl-12">{row.id}</td>
              <td className="px-4 py-3 text-sm text-gray-700 pl-12">{row.title || row.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
