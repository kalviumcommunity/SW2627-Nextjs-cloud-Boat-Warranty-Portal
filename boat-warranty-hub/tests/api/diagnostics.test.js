import { GET as getHoisting, POST as postHoisting } from '../../app/api/diagnostics/hoisting-engine/route';
import { GET as getSystem } from '../../app/api/diagnostics/system/route';
import { GET as getRules, POST as postRules } from '../../app/api/diagnostics/rules/route';

describe('Diagnostics & Hoisting API Endpoints', () => {
    describe('GET /api/diagnostics/hoisting-engine', () => {
        test('returns 200 with hoisting analysis data', async () => {
            const res = await getHoisting();
            expect(res.status).toBe(200);

            const body = await res.json();
            expect(body.success).toBe(true);
            expect(body.data.mechanicsCount).toBe(5);
            expect(body.data.demonstrations).toHaveLength(5);
        });
    });

    describe('POST /api/diagnostics/hoisting-engine', () => {
        test('evaluates payload and returns 200 with diagnostics report', async () => {
            const req = new Request('http://localhost/api/diagnostics/hoisting-engine', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serialNumber: 'SRV-TEST-9000',
                    productName: 'Cruiser 320',
                    isActive: true,
                    repairsCount: 1,
                    claimAmount: 500
                })
            });

            const res = await postHoisting(req);
            expect(res.status).toBe(200);

            const body = await res.json();
            expect(body.success).toBe(true);
            expect(body.data.serialNumber).toBe('SRV-TEST-9000');
            expect(body.data.status).toBe('PASSED');
        });
    });

    describe('GET /api/diagnostics/system', () => {
        test('returns 200 with system diagnostics summary', async () => {
            const req = new Request('http://localhost/api/diagnostics/system?includeDetails=true');
            const res = await getSystem(req);
            expect(res.status).toBe(200);

            const body = await res.json();
            expect(body.success).toBe(true);
            expect(body.data).toHaveProperty('healthScore');
            expect(body.data).toHaveProperty('system');
            expect(body.data.engine.includeDetails).toBe(true);
        });
    });

    describe('GET /api/diagnostics/rules', () => {
        test('returns 200 with rules list', async () => {
            const res = await getRules();
            expect(res.status).toBe(200);

            const body = await res.json();
            expect(body.success).toBe(true);
            expect(body.count).toBe(4);
            expect(body.data).toHaveLength(4);
        });
    });

    describe('POST /api/diagnostics/rules', () => {
        test('validates rules against payload', async () => {
            const req = new Request('http://localhost/api/diagnostics/rules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serialNumber: 'BW-550',
                    isActive: true,
                    repairsCount: 0,
                    claimAmount: 100
                })
            });

            const res = await postRules(req);
            expect(res.status).toBe(200);

            const body = await res.json();
            expect(body.success).toBe(true);
            expect(body.data.status).toBe('PASSED');
        });
    });
});
