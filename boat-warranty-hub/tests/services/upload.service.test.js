import * as uploadService from '../../services/upload.service';
import * as productRepository from '../../repositories/product.repository';
import * as storage from '../../lib/storage';

jest.mock('../../repositories/product.repository');

describe('Upload Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('uploadProductWarrantyPdf', () => {
        test('throws error if product not found', async () => {
            productRepository.findProductById.mockResolvedValue(null);
            await expect(uploadService.uploadProductWarrantyPdf(1, Buffer.from('test')))
                .rejects.toThrow("Product not found.");
        });

        test('throws error if warranty certificate already exists', async () => {
            productRepository.findProductById.mockResolvedValue({ id: 1, warrantyPdfUrl: 'url' });
            await expect(uploadService.uploadProductWarrantyPdf(1, Buffer.from('test')))
                .rejects.toThrow("Warranty certificate already exists.");
        });

        test('uploads pdf and updates product', async () => {
            productRepository.findProductById.mockResolvedValue({ id: 1, serialNumber: 'SN123' });
            productRepository.updateWarrantyPdf.mockResolvedValue({ id: 1, warrantyPdfUrl: 'mock-url' });
            
            const result = await uploadService.uploadProductWarrantyPdf(1, Buffer.from('test'));
            
            expect(storage.uploadWarrantyPdf).toHaveBeenCalledWith(Buffer.from('test'), 'SN123.pdf');
            expect(productRepository.updateWarrantyPdf).toHaveBeenCalledWith(1, 'https://mock-storage.com/warranty.pdf');
            expect(result.warrantyPdfUrl).toBe('mock-url');
        });

        test('replaces an existing warranty pdf when forceReplace is true', async () => {
            productRepository.findProductById.mockResolvedValue({ id: 1, serialNumber: 'SN123', warrantyPdfUrl: 'old-url.pdf' });
            productRepository.updateWarrantyPdf.mockResolvedValue({ id: 1, warrantyPdfUrl: 'new-url.pdf' });

            const result = await uploadService.uploadProductWarrantyPdf(1, Buffer.from('test'), true);

            expect(storage.deleteWarrantyPdf).toHaveBeenCalledWith('old-url.pdf');
            expect(storage.uploadWarrantyPdf).toHaveBeenCalledWith(Buffer.from('test'), 'SN123.pdf');
            expect(productRepository.updateWarrantyPdf).toHaveBeenCalledWith(1, 'https://mock-storage.com/warranty.pdf');
            expect(result.warrantyPdfUrl).toBe('new-url.pdf');
        });
    });

    describe('getWarrantyPdf', () => {
        test('throws error if product not found', async () => {
            productRepository.findProductById.mockResolvedValue(null);
            await expect(uploadService.getWarrantyPdf(1))
                .rejects.toThrow("Product not found.");
        });

        test('throws error if warranty certificate not uploaded', async () => {
            productRepository.findProductById.mockResolvedValue({ id: 1 });
            await expect(uploadService.getWarrantyPdf(1))
                .rejects.toThrow("Warranty certificate not uploaded.");
        });

        test('returns signed url', async () => {
            productRepository.findProductById.mockResolvedValue({ id: 1, warrantyPdfUrl: 'url' });
            const result = await uploadService.getWarrantyPdf(1);
            expect(storage.generateSignedUrl).toHaveBeenCalledWith('url');
            expect(result).toBe('https://mock-storage.com/signed-url.pdf');
        });
    });
});
