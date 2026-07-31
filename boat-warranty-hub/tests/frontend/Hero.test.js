/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Hero from '@/components/home/Hero';

describe('Hero Component', () => {
    it('renders the hero section with proper headings', () => {
        render(<Hero />);
        
        // Match the main headline or part of it
        const heading = screen.getByText(/Verify Your Warranty/i);
        expect(heading).toBeInTheDocument();
    });

    it('renders the trust badges', () => {
        render(<Hero />);
        
        const genuineBadge = screen.getByText(/100% Genuine/i);
        expect(genuineBadge).toBeInTheDocument();
        
        const instantResults = screen.getByText(/Instant Results/i);
        expect(instantResults).toBeInTheDocument();
    });
});
