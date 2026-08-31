import { NextResponse } from "next/server";
import { runFullSystemDiagnostics } from "@/services/hoistingDiagnostics.service";
import logger from "@/lib/logger";

/**
 * GET /api/diagnostics/system
 * Returns a comprehensive system diagnostics report with runtime telemetry and engine status.
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const includeDetails = searchParams.get("includeDetails") === "true";

        const diagnosticReport = await runFullSystemDiagnostics({ includeDetails });

        return NextResponse.json(
            {
                success: true,
                data: diagnosticReport
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error({ error }, "Failed to generate system diagnostics report");
        return NextResponse.json(
            {
                success: false,
                message: "Failed to generate system diagnostics report",
                error: error.message
            },
            { status: 500 }
        );
    }
}
