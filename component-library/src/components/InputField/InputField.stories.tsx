import React, { ChangeEvent } from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import InputField from './InputField';

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email';
  invalid?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  loading?: boolean;
  value?: string;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  helperText?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: {
      options: ['filled', 'outlined', 'ghost'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    type: {
      options: ['text', 'password', 'email'],
      control: { type: 'select' },
    },
    onChange: { action: 'changed' },
  },
} as Meta<typeof InputField>;

const Template: StoryFn<InputFieldProps> = (args) => <InputField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Username',
  placeholder: 'Enter your username',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  ...Default.args,
  helperText: 'This is a helper text',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  ...Default.args,
  invalid: true,
  errorMessage: 'This field is required',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};

export const WithClearButton = Template.bind({});
WithClearButton.args = {
  ...Default.args,
  value: 'Sample text',
  showClearButton: true,
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  ...Default.args,
  type: 'password',
  showPasswordToggle: true,
};

export const AllVariants = () => (
  <div className="space-y-4">
    <InputField label="Filled" variant="filled" placeholder="Filled variant" />
    <InputField label="Outlined" variant="outlined" placeholder="Outlined variant" />
    <InputField label="Ghost" variant="ghost" placeholder="Ghost variant" />
  </div>
);

export const AllSizes = () => (
  <div className="space-y-4">
    <InputField label="Small" size="sm" placeholder="Small size" />
    <InputField label="Medium" size="md" placeholder="Medium size" />
    <InputField label="Large" size="lg" placeholder="Large size" />
  </div>
);
