import prisma from '../__mocks__/prisma';
import * as productRepository from '../../repositories/product.repository';

describe('Product Repository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('findProductBySerialNumber calls prisma.product.findUnique', async () => {
        const mockProduct = { id: 1, serialNumber: 'SN123' };
        prisma.product.findUnique.mockResolvedValue(mockProduct);

        const result = await productRepository.findProductBySerialNumber('SN123');

        expect(prisma.product.findUnique).toHaveBeenCalledWith({
            where: { serialNumber: 'SN123' },
            include: { repairs: true }
        });
        expect(result).toEqual(mockProduct);
    });

    test('findProductById calls prisma.product.findUnique', async () => {
        const mockProduct = { id: 1 };
        prisma.product.findUnique.mockResolvedValue(mockProduct);

        const result = await productRepository.findProductById(1);

        expect(prisma.product.findUnique).toHaveBeenCalledWith({
            where: { id: 1 }
        });
        expect(result).toEqual(mockProduct);
    });

    test('findAllProducts calls prisma.product.findMany', async () => {
        const mockProducts = [{ id: 1 }];
        prisma.product.findMany.mockResolvedValue(mockProducts);

        const result = await productRepository.findAllProducts();

        expect(prisma.product.findMany).toHaveBeenCalled();
        expect(result).toEqual(mockProducts);
    });

    test('createProduct calls prisma.product.create', async () => {
        const mockData = { serialNumber: 'SN123', productName: 'Boat' };
        const mockProduct = { id: 1, ...mockData };
        prisma.product.create.mockResolvedValue(mockProduct);

        const result = await productRepository.createProduct(mockData);

        expect(prisma.product.create).toHaveBeenCalledWith({
            data: mockData
        });
        expect(result).toEqual(mockProduct);
    });

    test('updateProduct calls prisma.product.update', async () => {
        const mockData = { productName: 'Updated Boat' };
        const mockProduct = { id: 1, ...mockData };
        prisma.product.update.mockResolvedValue(mockProduct);

        const result = await productRepository.updateProduct(1, mockData);

        expect(prisma.product.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: mockData
        });
        expect(result).toEqual(mockProduct);
    });

    test('deleteProduct calls prisma.product.delete', async () => {
        const mockProduct = { id: 1 };
        prisma.product.delete.mockResolvedValue(mockProduct);

        const result = await productRepository.deleteProduct(1);

        expect(prisma.product.delete).toHaveBeenCalledWith({
            where: { id: 1 }
        });
        expect(result).toEqual(mockProduct);
    });

    test('countProducts calls prisma.product.count', async () => {
        prisma.product.count.mockResolvedValue(5);
        const result = await productRepository.countProducts();
        expect(prisma.product.count).toHaveBeenCalled();
        expect(result).toBe(5);
    });

    test('countActiveProducts calls prisma.product.count with correct where clause', async () => {
        prisma.product.count.mockResolvedValue(3);
        const result = await productRepository.countActiveProducts();
        expect(prisma.product.count).toHaveBeenCalledWith(expect.objectContaining({
            where: expect.objectContaining({
                isActive: true,
                warrantyExpiry: expect.any(Object)
            })
        }));
        expect(result).toBe(3);
    });

    test('countExpiredProducts calls prisma.product.count with correct where clause', async () => {
        prisma.product.count.mockResolvedValue(2);
        const result = await productRepository.countExpiredProducts();
        expect(prisma.product.count).toHaveBeenCalledWith(expect.objectContaining({
            where: expect.objectContaining({
                warrantyExpiry: expect.any(Object)
            })
        }));
        expect(result).toBe(2);
    });

    test('updateWarrantyPdf calls prisma.product.update', async () => {
        const mockProduct = { id: 1, warrantyPdfUrl: 'url' };
        prisma.product.update.mockResolvedValue(mockProduct);

        const result = await productRepository.updateWarrantyPdf(1, 'url');

        expect(prisma.product.update).toHaveBeenCalledWith({
            where: { id: 1 },
            data: {
                warrantyPdfUrl: 'url',
                pdfUploadedAt: expect.any(Date)
            }
        });
        expect(result).toEqual(mockProduct);
    });
});
