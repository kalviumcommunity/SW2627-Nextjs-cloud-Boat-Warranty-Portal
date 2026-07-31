/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signOut } from 'next-auth/react';
import AdminNavbar from '@/components/layout/AdminSidebar';

describe('AdminSidebar', () => {
    beforeEach(() => {
        // Mock fetch for notifications
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true, data: [], pendingCount: 0 }),
            })
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders the boat logo', () => {
        render(<AdminNavbar admin={{ name: 'Admin User', email: 'admin@boat.com' }} />);
        const logoElements = screen.getAllByText(/bo/i); // Matches boAt
        expect(logoElements.length).toBeGreaterThan(0);
    });

    it('renders the admin name in profile dropdown trigger', () => {
        render(<AdminNavbar admin={{ name: 'Admin User', email: 'admin@boat.com' }} />);
        expect(screen.getByText('Admin User')).toBeInTheDocument();
        expect(screen.getByText('Warranty Admin')).toBeInTheDocument();
    });

    it('toggles the profile dropdown when clicked', () => {
        render(<AdminNavbar admin={{ name: 'Admin User', email: 'admin@boat.com' }} />);
        
        const profileTrigger = screen.getByText('Admin User');
        fireEvent.click(profileTrigger);
        
        expect(screen.getByText('admin@boat.com')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        
        fireEvent.click(profileTrigger);
        expect(screen.queryByText('admin@boat.com')).not.toBeInTheDocument();
    });

    it('calls signOut when logout is clicked from header button', async () => {
        render(<AdminNavbar admin={{ name: 'Admin User', email: 'admin@boat.com' }} />);
        
        const logoutButton = screen.getAllByText('Logout')[0];
        fireEvent.click(logoutButton);
        
        await waitFor(() => {
            expect(signOut).toHaveBeenCalledWith({ redirect: false });
        });
    });
});
