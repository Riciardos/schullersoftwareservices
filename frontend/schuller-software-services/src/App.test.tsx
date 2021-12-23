import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Github link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Github/i);
  expect(linkElement).toBeInTheDocument();
});
