import * as hoistingDiagnosticsService from '../../services/hoistingDiagnostics.service';

describe('Hoisting Diagnostics Service', () => {
    describe('analyzeHoistingMechanics', () => {
        test('returns complete analysis with 5 core hoisting demonstrations', () => {
            const analysis = hoistingDiagnosticsService.analyzeHoistingMechanics();

            expect(analysis).toHaveProperty('concept');
            expect(analysis).toHaveProperty('mechanicsCount', 5);
            expect(analysis.demonstrations).toHaveLength(5);

            // 1. Function declaration hoisting check
            const funcDemo = analysis.demonstrations.find(d => d.id === 'FUNC_HOISTING_01');
            expect(funcDemo).toBeDefined();
            expect(funcDemo.preDeclarationCallSuccess).toBe(true);
            expect(funcDemo.postDeclarationCallSuccess).toBe(true);

            // 2. Var hoisting check
            const varDemo = analysis.demonstrations.find(d => d.id === 'VAR_HOISTING_02');
            expect(varDemo).toBeDefined();
            expect(varDemo.isUndefinedBeforeAssignment).toBe(true);
            expect(varDemo.valueBeforeAssignment).toBe('undefined');
            expect(varDemo.valueAfterAssignment).toBe('Initialized Value');

            // 3. TDZ check
            const tdzDemo = analysis.demonstrations.find(d => d.id === 'TDZ_HOISTING_03');
            expect(tdzDemo).toBeDefined();
            expect(tdzDemo.letTdzTriggeredReferenceError).toBe(true);
            expect(tdzDemo.constTdzTriggeredReferenceError).toBe(true);
            expect(tdzDemo.classTdzTriggeredReferenceError).toBe(true);

            // 4. Scope shadowing check
            const shadowDemo = analysis.demonstrations.find(d => d.id === 'SCOPE_SHADOW_04');
            expect(shadowDemo).toBeDefined();
            expect(shadowDemo.shadowingBehavior.isShadowUndefinedInitially).toBe(true);
            expect(shadowDemo.shadowingBehavior.resolvedValue).toBe('inner-var');

            // 5. Mutual recursion check
            const recursionDemo = analysis.demonstrations.find(d => d.id === 'MUTUAL_RECURSION_05');
            expect(recursionDemo).toBeDefined();
            expect(recursionDemo.recursionResult).toBe('COMPLETE');
            expect(recursionDemo.callTrace.length).toBeGreaterThan(0);
        });
    });

    describe('runFullSystemDiagnostics', () => {
        test('executes top-down diagnostics pipeline without errors', async () => {
            const report = await hoistingDiagnosticsService.runFullSystemDiagnostics();

            expect(report.success).toBe(true);
            expect(report.status).toMatch(/HEALTHY|WARNING|CRITICAL/);
            expect(report.healthScore).toBeGreaterThanOrEqual(0);
            expect(report.healthScore).toBeLessThanOrEqual(100);
            expect(report.system).toHaveProperty('memory');
            expect(report.system).toHaveProperty('nodeVersion');
            expect(report.engine.engineState).toBe('OPTIMAL');
            expect(report.engine.checksPassed).toBe(5);
        });

        test('includes details when option is passed', async () => {
            const report = await hoistingDiagnosticsService.runFullSystemDiagnostics({ includeDetails: true });

            expect(report.engine.includeDetails).toBe(true);
            expect(report.engine.details).toBeDefined();
            expect(report.engine.details).toHaveLength(5);
        });
    });

    describe('evaluateWarrantyDiagnostics', () => {
        test('evaluates valid payload successfully as PASSED', () => {
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 2);

            const payload = {
                serialNumber: 'BOAT-9921',
                productName: 'Yamaha Outboard 250HP',
                purchaseDate: new Date('2023-01-01'),
                warrantyExpiry: futureDate,
                isActive: true,
                repairsCount: 1,
                claimAmount: 1200,
                claimDescription: 'Minor impeller check'
            };

            const result = hoistingDiagnosticsService.evaluateWarrantyDiagnostics(payload);

            expect(result.success).toBe(true);
            expect(result.status).toBe('PASSED');
            expect(result.riskLevel).toBe('LOW');
            expect(result.violations).toHaveLength(0);
            expect(result.recommendations.length).toBeGreaterThan(0);
        });

        test('flags payload with invalid serial and expired warranty', () => {
            const pastDate = new Date();
            pastDate.setFullYear(pastDate.getFullYear() - 2);

            const payload = {
                serialNumber: 'X',
                productName: 'Sailboat 100',
                purchaseDate: new Date('2020-01-01'),
                warrantyExpiry: pastDate,
                isActive: false,
                repairsCount: 8,
                claimAmount: 25000
            };

            const result = hoistingDiagnosticsService.evaluateWarrantyDiagnostics(payload);

            expect(result.success).toBe(true);
            expect(result.status).toBe('FLAGGED');
            expect(result.riskLevel).toBe('CRITICAL');
            expect(result.violations.length).toBeGreaterThan(0);
            expect(result.recommendations).toContain('Route claim to Senior Warranty Auditor for manual inspection.');
        });

        test('handles invalid payload types gracefully', () => {
            const result = hoistingDiagnosticsService.evaluateWarrantyDiagnostics(null);
            expect(result.success).toBe(false);
            expect(result.statusCode).toBe(400);
        });
    });

    describe('getRegisteredDiagnosticRules', () => {
        test('returns configured diagnostic rules list', () => {
            const rules = hoistingDiagnosticsService.getRegisteredDiagnosticRules();
            expect(Array.isArray(rules)).toBe(true);
            expect(rules.length).toBe(4);
            expect(rules[0]).toHaveProperty('id');
            expect(rules[0]).toHaveProperty('severity');
        });
    });
});
