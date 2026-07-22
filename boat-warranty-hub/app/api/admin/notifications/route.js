import { NextResponse } from 'next/server';
import { getRecentRepairs, countPendingRepairs } from '@/repositories/repair.repository';
import logger from '@/lib/logger';

export async function GET() {
  try {
    const repairs = await getRecentRepairs(15);
    const pendingCount = await countPendingRepairs();

    const notifications = repairs.map((repair) => {
      let context = 'process'; // default blue
      if (repair.repairStatus === 'PENDING') context = 'warning'; // yellow for pending action
      if (repair.repairStatus === 'COMPLETED') context = 'success'; // green for completed
      if (repair.repairStatus === 'CANCELLED') context = 'error'; // red for rejected

      return {
        id: `repair-${repair.id}`,
        repairId: repair.id,
        type: 'REPAIR_REQUEST',
        title: `Repair Ticket #${repair.id}`,
        message: `Issue: "${repair.issue}" — Product: ${repair.product?.productName || 'Unknown'} (SN: ${repair.product?.serialNumber || 'N/A'})`,
        issue: repair.issue,
        serialNumber: repair.product?.serialNumber || '',
        productName: repair.product?.productName || 'boAt Device',
        status: repair.repairStatus,
        context,
        createdAt: repair.createdAt,
      };
    });

    return NextResponse.json({
      success: true,
      pendingCount,
      totalCount: notifications.length,
      data: notifications,
    });
  } catch (error) {
    logger.error({ error }, 'Failed to fetch admin notifications');
    return NextResponse.json({ success: false, message: 'Failed to fetch notifications' }, { status: 500 });
  }
}
