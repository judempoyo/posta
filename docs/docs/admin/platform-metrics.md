---
sidebar_position: 3
title: Platform Metrics
description: Platform-wide metrics and analytics
---

# Platform Metrics

Administrators can view aggregated metrics across all users.

## Overview Metrics

```
GET /api/v1/admin/metrics
```

```json
{
  "success": true,
  "data": {
    "total_users": 150,
    "total_emails": 500000,
    "sent": 485000,
    "failed": 10000,
    "bounces": 3000,
    "suppressions": 1200,
    "api_keys": 300
  }
}
```

## Platform Analytics

Date-filtered analytics across all users:

```
GET /api/v1/admin/analytics?start_date=2026-01-01&end_date=2026-01-31
```

## Advanced Dashboard

```
GET /api/v1/admin/analytics/dashboard?start_date=2026-01-01&end_date=2026-01-31
```

Returns delivery rate trends, bounce rate graphs, and latency percentiles.

## Real-Time Monitoring

### Event Stream (SSE)

Stream platform events in real-time:

```
GET /api/v1/admin/events/stream?token=<jwt-token>
```

### Metrics Stream (SSE)

Monitor background worker activity and API server runtime stats:

```
GET /api/v1/admin/metrics/stream?token=<jwt-token>
```

Emits two event types:

- `worker.status` — real-time worker count and processing details.
- `system.status` — server uptime, current goroutine count, and heap memory usage.
