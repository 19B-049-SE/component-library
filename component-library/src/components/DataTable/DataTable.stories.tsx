import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import DataTable from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive';
}

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
    render?: (value: any, record: T) => React.ReactNode;
  }[];
  selectable?: boolean;
  loading?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

const userData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 22, status: 'active' },
];

const columns: DataTableProps<User>['columns'] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (value: string) => (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {value}
      </span>
    ),
  },
];

export default {
  title: 'Components/DataTable',
  component: DataTable,
  argTypes: {
    onRowSelect: { action: 'rowsSelected' },
  },
} as Meta<typeof DataTable>;

const Template: StoryFn<DataTableProps<User>> = (args) => <DataTable {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  data: userData,
  columns,
};

export const Selectable = Template.bind({});
Selectable.args = {
  data: userData,
  columns,
  selectable: true,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  data: [],
  columns,
  loading: true,
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  data: [],
  columns,
};

export const WithCustomRender = Template.bind({});
WithCustomRender.args = {
  data: userData,
  columns: [
    { key: 'id', title: 'ID', dataIndex: 'id' },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      render: (value: string, record: User) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {value.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'age', title: 'Age', dataIndex: 'age' },
    { key: 'status', title: 'Status', dataIndex: 'status' },
  ],
};