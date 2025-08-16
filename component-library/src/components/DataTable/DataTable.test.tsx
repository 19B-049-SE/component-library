import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from './DataTable';

interface TestData {
  id: number;
  name: string;
  age: number;
}

describe('DataTable', () => {
  const testData: TestData[] = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  const columns = [
    { key: 'id', title: 'ID', dataIndex: 'id' as const, sortable: true },
    { key: 'name', title: 'Name', dataIndex: 'name' as const, sortable: true },
    { key: 'age', title: 'Age', dataIndex: 'age' as const, sortable: true },
  ];

  test('renders table with data', () => {
    render(<DataTable data={testData} columns={columns} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  test('sorts data when sortable column header is clicked', () => {
    render(<DataTable data={testData} columns={columns} />);
    
    // Click name column to sort ascending
    fireEvent.click(screen.getByText('Name'));
    const namesAscending = screen.getAllByRole('cell', { name: /Alice|Bob|Charlie/ });
    expect(namesAscending[0]).toHaveTextContent('Alice');
    expect(namesAscending[1]).toHaveTextContent('Bob');
    expect(namesAscending[2]).toHaveTextContent('Charlie');
    
    // Click name column again to sort descending
    fireEvent.click(screen.getByText('Name'));
    const namesDescending = screen.getAllByRole('cell', { name: /Alice|Bob|Charlie/ });
    expect(namesDescending[0]).toHaveTextContent('Charlie');
    expect(namesDescending[1]).toHaveTextContent('Bob');
    expect(namesDescending[2]).toHaveTextContent('Alice');
  });

  test('shows loading state when loading is true', () => {
    render(<DataTable data={[]} columns={columns} loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('shows empty state when no data', () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('selects and deselects rows when selectable', () => {
    const mockOnRowSelect = jest.fn();
    render(
      <DataTable
        data={testData}
        columns={columns}
        selectable
        onRowSelect={mockOnRowSelect}
      />
    );
    
    // Select first row
    const checkbox = screen.getAllByRole('checkbox')[1]; // First checkbox is select all
    fireEvent.click(checkbox);
    expect(mockOnRowSelect).toHaveBeenCalledWith([testData[0]]);
    
    // Select all rows
    const selectAll = screen.getAllByRole('checkbox')[0];
    fireEvent.click(selectAll);
    expect(mockOnRowSelect).toHaveBeenCalledWith(testData);
    
    // Deselect all
    fireEvent.click(selectAll);
    expect(mockOnRowSelect).toHaveBeenCalledWith([]);
  });
});