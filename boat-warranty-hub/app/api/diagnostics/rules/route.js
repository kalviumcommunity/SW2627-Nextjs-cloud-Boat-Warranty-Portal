import { NextResponse } from "next/server";
import { 
    getRegisteredDiagnosticRules, 
    evaluateWarrantyDiagnostics 
} from "@/services/hoistingDiagnostics.service";
import logger from "@/lib/logger";

/**
 * GET /api/diagnostics/rules
 * Returns all active diagnostic rules and specifications.
 */
export async function GET() {
    try {
        const rules = getRegisteredDiagnosticRules();
        return NextResponse.json(
            {
                success: true,
                count: rules.length,
                data: rules
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error({ error }, "Failed to fetch diagnostic rules");
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch diagnostic rules",
                error: error.message
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/diagnostics/rules
 * Validates a payload directly against the diagnostic rule tree.
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const evaluation = evaluateWarrantyDiagnostics(body);

        return NextResponse.json(
            {
                success: true,
                data: evaluation
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error({ error }, "Failed to evaluate diagnostic rules");
        return NextResponse.json(
            {
                success: false,
                message: "Failed to evaluate diagnostic rules",
                error: error.message
            },
            { status: 500 }
        );
    }
}
