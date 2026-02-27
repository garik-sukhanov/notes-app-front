import { render, screen } from '@testing-library/react';

import { Page } from './ui/page';

describe('Page', () => {
  it('renders title and children', () => {
    render(
      <Page title="Test Title">
        <div>Content</div>
      </Page>,
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
