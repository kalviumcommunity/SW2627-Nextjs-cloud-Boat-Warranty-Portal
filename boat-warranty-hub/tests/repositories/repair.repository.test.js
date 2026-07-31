import prisma from '../__mocks__/prisma';
import * as repairRepository from '../../repositories/repair.repository';

describe('Repair Repository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createRepair calls prisma.repair.create', async () => {
        const mockData = { issue: 'Broken' };
        const mockRepair = { id: 1, ...mockData };
        prisma.repair.create.mockResolvedValue(mockRepair);

        const result = await repairRepository.createRepair(mockData);

        expect(prisma.repair.create).toHaveBeenCalledWith({
            data: mockData
        });
        expect(result).toEqual(mockRepair);
    });

    test('findRepairById calls prisma.repair.findUnique', async () => {
        const mockRepair = { id: 1 };
        prisma.repair.findUnique.mockResolvedValue(mockRepair);

        const result = await repairRepository.findRepairById(1);

        expect(prisma.repair.findUnique).toHaveBeenCalledWith({
            where: { id: 1 },
            include: { product: true }
        });
        expect(result).toEqual(mockRepair);
    });

    test('findRepairByProductId calls prisma.repair.findMany', async () => {
        const mockRepairs = [{ id: 1, productId: 1 }];
        prisma.repair.findMany.mockResolvedValue(mockRepairs);

        const result = await repairRepository.findRepairByProductId(1);

        expect(prisma.repair.findMany).toHaveBeenCalledWith({
            where: { productId: 1 },
            orderBy: { repairDate: "desc" }
        });
        expect(result).toEqual(mockRepairs);
    });

    test('updateRepair calls prisma.repair.update', async () => {
        const mockData = { repairStatus: 'COMPLETED' };
        const mockRepair = { id: 1, ...mockData };
        prisma.repair.update.mockResolvedValue(mockRepair);

        const result = await repairRepository.updateRepair(1, mockData);

        expect(prisma.repair.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: mockData
        });
        expect(result).toEqual(mockRepair);
    });

    test('deleteRepair calls prisma.repair.delete', async () => {
        const mockRepair = { id: 1 };
        prisma.repair.delete.mockResolvedValue(mockRepair);

        const result = await repairRepository.deleteRepair(1);

        expect(prisma.repair.delete).toHaveBeenCalledWith({
            where: { id: 1 }
        });
        expect(result).toEqual(mockRepair);
    });

    test('countRepairs calls prisma.repair.count', async () => {
        prisma.repair.count.mockResolvedValue(5);
        const result = await repairRepository.countRepairs();
        expect(prisma.repair.count).toHaveBeenCalled();
        expect(result).toBe(5);
    });

    test('countPendingRepairs calls prisma.repair.count', async () => {
        prisma.repair.count.mockResolvedValue(3);
        const result = await repairRepository.countPendingRepairs();
        expect(prisma.repair.count).toHaveBeenCalledWith({
            where: { repairStatus: "PENDING" }
        });
        expect(result).toBe(3);
    });

    test('countCompletedRepairs calls prisma.repair.count', async () => {
        prisma.repair.count.mockResolvedValue(2);
        const result = await repairRepository.countCompletedRepairs();
        expect(prisma.repair.count).toHaveBeenCalledWith({
            where: { repairStatus: "COMPLETED" }
        });
        expect(result).toBe(2);
    });

    test('getRecentRepairs calls prisma.repair.findMany', async () => {
        const mockRepairs = [{ id: 1 }];
        prisma.repair.findMany.mockResolvedValue(mockRepairs);

        const result = await repairRepository.getRecentRepairs(5);

        expect(prisma.repair.findMany).toHaveBeenCalledWith({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { product: true }
        });
        expect(result).toEqual(mockRepairs);
    });
});
