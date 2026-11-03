import React, { useMemo } from 'react';

import { getSpecificInsight } from '@formant/ava';

import { InsightCard } from '../InsightCard';

import type { InsightType, SpecificInsightProps } from '@formant/ava';

/** deterministic data shaped to trigger each insight type, so every chart/narrative path can be eyeballed */
const days = Array.from({ length: 30 }, (_, i) => `2025-03-${String(i + 1).padStart(2, '0')} 00:00:00`);
const wobble = (i: number) => Math.sin(i * 1.7) * 1.5;

const GALLERY: { insightType: InsightType; props: Omit<SpecificInsightProps, 'insightType'> }[] = [
  {
    insightType: 'trend',
    props: {
      data: days.map((time, i) => ({ time, value: 20 + i * 1.2 + wobble(i) })),
      dimensions: [{ fieldName: 'time' }],
      measures: [{ fieldName: 'value', method: 'SUM' }],
    },
  },
  {
    insightType: 'change_point',
    props: {
      data: days.map((time, i) => ({ time, value: (i < 15 ? 12 : 42) + wobble(i) })),
      dimensions: [{ fieldName: 'time' }],
      measures: [{ fieldName: 'value', method: 'SUM' }],
    },
  },
  {
    insightType: 'time_series_outlier',
    props: {
      data: days.map((time, i) => ({ time, value: 30 + wobble(i) + (i === 9 ? 25 : 0) + (i === 21 ? -18 : 0) })),
      dimensions: [{ fieldName: 'time' }],
      measures: [{ fieldName: 'value', method: 'SUM' }],
    },
  },
  {
    insightType: 'category_outlier',
    props: {
      data: ['arm', 'base', 'camera', 'drive', 'gps', 'lidar', 'motor', 'wheel'].map((part, i) => ({
        part,
        errors: part === 'lidar' ? 96 : 10 + (i % 3) * 2,
      })),
      dimensions: [{ fieldName: 'part' }],
      measures: [{ fieldName: 'errors', method: 'SUM' }],
    },
  },
  {
    insightType: 'low_variance',
    props: {
      data: ['spot-1', 'spot-2', 'spot-3', 'spot-4', 'spot-5', 'spot-6'].map((robot, i) => ({
        robot,
        uptime: 98 + (i % 2) * 0.4,
      })),
      dimensions: [{ fieldName: 'robot' }],
      measures: [{ fieldName: 'uptime', method: 'MEAN' }],
    },
  },
  {
    insightType: 'majority',
    props: {
      data: [
        { level: 'error', count: 80 },
        { level: 'warning', count: 12 },
        { level: 'info', count: 8 },
      ],
      dimensions: [{ fieldName: 'level' }],
      measures: [{ fieldName: 'count', method: 'SUM' }],
    },
  },
  {
    insightType: 'correlation',
    props: {
      data: Array.from({ length: 30 }, (_, i) => ({ id: `${i}`, speed: i, battery_drain: i * 2 + wobble(i) * 2 })),
      dimensions: [{ fieldName: 'id' }],
      measures: [
        { fieldName: 'speed', method: 'SUM' },
        { fieldName: 'battery_drain', method: 'SUM' },
      ],
    },
  },
];

/** one card per insight type */
export const InsightGallery = () => {
  const insights = useMemo(
    () =>
      GALLERY.map(({ insightType, props }) => ({
        insightType,
        info: getSpecificInsight({ ...props, insightType, options: { visualizationOptions: { lang: 'en-US' } } }),
      })),
    []
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 420px)', gap: 16 }}>
      {insights.map(({ insightType, info }) => (
        <div key={insightType} data-insight-type={insightType}>
          <InsightCard title="$.robot" insightInfo={info} footerTools={[]} />
        </div>
      ))}
    </div>
  );
};
