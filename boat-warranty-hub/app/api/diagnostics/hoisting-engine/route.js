import { NextResponse } from "next/server";
import { 
    analyzeHoistingMechanics, 
    evaluateWarrantyDiagnostics 
} from "@/services/hoistingDiagnostics.service";
import logger from "@/lib/logger";

/**
 * GET /api/diagnostics/hoisting-engine
 * Runs hoisting simulation benchmarks and returns execution context introspection details.
 */
export async function GET() {
    try {
        const hoistingAnalysis = analyzeHoistingMechanics();
        return NextResponse.json(
            {
                success: true,
                data: hoistingAnalysis
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error({ error }, "Failed to analyze hoisting mechanics");
        return NextResponse.json(
            {
                success: false,
                message: "Failed to analyze JavaScript hoisting mechanics",
                error: error.message
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/diagnostics/hoisting-engine
 * Evaluates custom claim or telemetry payloads through the hoisting-powered pipeline.
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const diagnosticResult = evaluateWarrantyDiagnostics(body);

        return NextResponse.json(
            {
                success: true,
                data: diagnosticResult
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error({ error }, "Failed to execute hoisting-driven diagnostics");
        return NextResponse.json(
            {
                success: false,
                message: "Failed to execute diagnostic evaluation",
                error: error.message
            },
            { status: 500 }
        );
    }
}
