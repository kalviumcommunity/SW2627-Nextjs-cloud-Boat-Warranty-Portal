module.exports = {
  uploadFile: jest.fn().mockResolvedValue('https://mock-storage.com/file.pdf'),
  deleteFile: jest.fn().mockResolvedValue(true),
  uploadWarrantyPdf: jest.fn().mockResolvedValue('https://mock-storage.com/warranty.pdf'),
  deleteWarrantyPdf: jest.fn().mockResolvedValue(true),
  generateSignedUrl: jest.fn().mockResolvedValue('https://mock-storage.com/signed-url.pdf'),
};
