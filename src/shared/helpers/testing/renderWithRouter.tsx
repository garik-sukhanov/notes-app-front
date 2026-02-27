import { MemoryRouter } from 'react-router-dom';

export const renderWithRouter = (children: React.ReactNode) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};
