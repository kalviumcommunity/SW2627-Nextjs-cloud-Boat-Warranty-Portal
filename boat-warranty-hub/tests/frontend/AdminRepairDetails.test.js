/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminRepairDetailsPage from '@/app/admin/repair-history/[id]/page';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

describe('AdminRepairDetailsPage', () => {
    beforeEach(() => {
        // Setup initial mocks (session and params already mocked in setup.js)
        
        global.fetch = jest.fn((url, options) => {
            if (typeof url === 'string' && url.includes('/api/admin/notifications')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ success: true, data: [], pendingCount: 0 })
                });
            }
            if (options && options.method === 'PUT') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({
                        success: true,
                        data: {
                            id: 1,
                            repairStatus: JSON.parse(options.body).repairStatus,
                            technicianNotes: JSON.parse(options.body).technicianNotes,
                            issue: 'Screen broken',
                            repairDate: new Date().toISOString(),
                            product: { serialNumber: 'SN12345' }
                        }
                    })
                });
            }

            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    success: true,
                    data: {
                        id: 1,
                        repairStatus: 'PENDING',
                        technicianNotes: 'No notes yet',
                        issue: 'Screen broken',
                        repairDate: new Date().toISOString(),
                        product: { serialNumber: 'SN12345' }
                    }
                }),
            });
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders loading state initially', () => {
        render(<AdminRepairDetailsPage />);
        expect(screen.getByText(/Loading details.../i)).toBeInTheDocument();
    });

    it('renders repair details after fetching', async () => {
        render(<AdminRepairDetailsPage />);
        
        await waitFor(() => {
            expect(screen.queryByText(/Loading details.../i)).not.toBeInTheDocument();
        });

        expect(screen.getByText('Viewing detailed information for Repair #1')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument(); // from statusStyle logic
        expect(screen.getByText('Screen broken')).toBeInTheDocument();
        expect(screen.getByText('No notes yet')).toBeInTheDocument();
    });

    it('toggles edit mode and saves changes', async () => {
        render(<AdminRepairDetailsPage />);
        
        await waitFor(() => {
            expect(screen.queryByText(/Loading details.../i)).not.toBeInTheDocument();
        });

        // Click Edit Record button
        const editButton = screen.getByText('Edit Record');
        fireEvent.click(editButton);

        // Verify we are in edit mode
        expect(screen.getByText('Save Changes')).toBeInTheDocument();
        const select = screen.getByRole('combobox');
        const textarea = screen.getByPlaceholderText('Enter technician remarks or services performed...');
        
        expect(select).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();

        // Change values
        fireEvent.change(select, { target: { value: 'COMPLETED' } });
        fireEvent.change(textarea, { target: { value: 'Fixed screen' } });

        // Save changes
        const saveButton = screen.getByText('Save Changes');
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(3); // 1 initial fetch + 1 notifications fetch + 1 PUT
        });

        // Should exit edit mode
        expect(screen.queryByText('Save Changes')).not.toBeInTheDocument();
        expect(screen.getByText('Fixed screen')).toBeInTheDocument();
    });
});
