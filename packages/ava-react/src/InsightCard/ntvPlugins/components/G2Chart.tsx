import React, { useEffect, useRef } from 'react';

import { Chart, G2Spec } from '@antv/g2';

import { INSIGHT_CARD_PREFIX_CLS } from '../../constants';

import { useTheme } from 'styled-components';

export interface IThemeConfig {
  name: string;
  colors: { [key: string]: string };
  backgroundImage: string;
  defaultTheme: "light" | "dark";
}


export const getSelectedColorSetFromStorage = (
 
) => {
  const storageThemeKey = "formant-ui-platform-theme";
  return (
      localStorage.getItem(storageThemeKey) 
  );
};

export const G2Chart = ({ spec, height, width }: { spec: G2Spec; height?: number; width?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = React.useRef<Chart>(null);
  const isRendering = React.useRef(false);

  const theme = useTheme();

  const themeList = getSelectedColorSetFromStorage();

  const isDark = theme?.["--color-action-primary"] === "#18d2ff";

  
  // Accessing the "--color-text-module" value from the theme object
  console.log('Current module text color:', theme, themeList);

  const renderChart = async () => {
    if (!chartRef?.current) {
      chartRef.current = new Chart({
        container: containerRef?.current,
        autoFit: true,
        padding: 'auto',
      });
      chartRef.current.options({ ...spec, theme: isDark ? 'classicDark' : 'light' });
    } else {
      chartRef.current.clear();
      chartRef.current.options({
        autoFit: true,
        padding: 'auto',
      });
      chartRef.current.options({ ...spec, theme: isDark ? 'classicDark' : 'light' });
    }

    if (!isRendering.current) {
      isRendering.current = true;
      await chartRef.current?.render();
      isRendering.current = false;
    }
  };

  useEffect(() => {
    renderChart();
  }, [spec]);

  return (
    <div className={`${INSIGHT_CARD_PREFIX_CLS}-chart-container`}>
      <div ref={containerRef} style={{ height, width }} />
    </div>
  );
};
