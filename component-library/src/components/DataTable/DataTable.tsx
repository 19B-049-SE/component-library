import React, { useState, useEffect } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) => {
  const [sortedData, setSortedData] = useState<T[]>(data);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'ascending' | 'descending' } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  useEffect(() => {
    if (sortConfig !== null) {
      const sorted = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setSortedData(sorted);
    }
  }, [sortConfig, data]);

  const requestSort = (key: keyof T) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const toggleRowSelection = (row: T) => {
    let newSelectedRows: T[];
    if (selectedRows.some(selectedRow => selectedRow === row)) {
      newSelectedRows = selectedRows.filter(selectedRow => selectedRow !== row);
    } else {
      newSelectedRows = [...selectedRows, row];
    }
    setSelectedRows(newSelectedRows);
    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    }
    setSelectAll(newSelectedRows.length === data.length);
  };

  const toggleSelectAll = () => {
    let newSelectedRows: T[];
    if (selectAll) {
      newSelectedRows = [];
    } else {
      newSelectedRows = [...data];
    }
    setSelectedRows(newSelectedRows);
    setSelectAll(!selectAll);
    if (onRowSelect) {
      onRowSelect(newSelectedRows);
    }
  };

  const getSortIndicator = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={() => column.sortable && requestSort(column.dataIndex)}
              >
                {column.title}
                {column.sortable && getSortIndicator(column.dataIndex)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-4 text-center">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-6 py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${selectedRows.includes(row) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => toggleRowSelection(row)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render
                      ? column.render(row[column.dataIndex], row)
                      : row[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;