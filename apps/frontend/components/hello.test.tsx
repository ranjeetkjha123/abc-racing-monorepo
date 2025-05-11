import React from 'react';
import { render, screen } from '@testing-library/react';
import Hello from './Hello';

test('renders Hello component', () => {
    render(<Hello />);
    const linkElement = screen.getByText(/hello/i);
    expect(linkElement).toBeInTheDocument();
});