import { renderHook } from '@testing-library/react';
import { useMediaQuery } from './index';

describe('useMediaQuery', () => {
    it('returns true when media query matches', () => {
        // Mock matchMedia
        window.matchMedia = vi.fn().mockImplementation(query => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: vi.fn(), // Deprecated
            removeListener: vi.fn(), // Deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
        expect(result.current).toBe(true);
    });

    it('returns false when media query does not match', () => {
        window.matchMedia = vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
        expect(result.current).toBe(false);
    });
});
