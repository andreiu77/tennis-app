// npm run monitor-script
import prisma from '../lib/prisma';

async function checkMonitoredUsers() {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

  const userActivity = await prisma.log.groupBy({
    by: ['userId'],
    where: {
      createdAt: {
        gte: cutoff,
      },
    },
    _count: true,
    having: {
      userId: {
        _count: {
          gt: 20
        }
      }
    },
  });

  for (const activity of userActivity) {
    await prisma.monitoredUser.upsert({
      where: { userId: activity.userId },
      update: {},
      create: { userId: activity.userId },
    });
  }

  console.log(`[${new Date().toISOString()}] Checked and updated ${userActivity.length} monitored users.`);
}

// Run every 2 minutes
setInterval(() => {
  checkMonitoredUsers().catch(console.error);
}, 2 * 60 * 1000); // 2 mins in ms

// Run immediately on start
checkMonitoredUsers();
