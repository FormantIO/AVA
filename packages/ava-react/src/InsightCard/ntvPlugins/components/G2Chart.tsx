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
): string => {
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

  const isDark = themeList !== "light" || theme?.["--color-action-primary"] === "#18d2ff";

  
  // Accessing the "--color-text-module" value from the theme object

  const renderChart = async () => {
    const updatedSpec = {  paddingTop: 20, axis: {...spec.axis, autohide: true}, scale:  {...spec.scale, x: {nice: true}, y: {nice: true}, theme: isDark ? 'classicDark' : 'light' } };
   
    if (!chartRef?.current) {
      
      chartRef.current = new Chart({
        container: containerRef?.current,
        autoFit: true,
        padding: 'auto',
      });
        chartRef.current.options({ 
          ...spec, ...updatedSpec});
    //   if (isDark) {
    //     chartRef.current.theme({theme: isDark ? 'classicDark' : 'light',
    //       backgroundColor: '#2d3855', // '--color-background-primary',
    //       components: {
    //         axis: {
    //           common: {
    //             grid: {
    //               line: {
    //                 type: "line", 
    //                 style: {
    //                   stroke: '#1c1e2d', // '--color-border-primary',
    //                   lineWidth: 2,
    //                 }
                    
    //               },
    //             },
    //             label: {
    //               style: {
    //                 fill: '#ffffff',
    //                 lineHeight: 18,
    //               }
    //             },
    //             tickLine: {
    //               line: {
    //                 type: "line", 
    //                 style: {
    //                   stroke: '#1c1e2d', // '--color-border-primary',
    //                   lineWidth: 2,
    //                 }
                    
    //               },
    //             },
    //             line: {
    //               style: {
    //                 stroke: '#1c1e2d', // '--color-border-primary',
    //                 lineWidth: 2,
    //               }
    //             },
    //           }
    //         }
          
    //         },
          
    //       StyleSheet: {colors10: [
          
    // "#20a0ff", // royal-blue
    // "#ea719d", // red
    // "#795bce", // red-dark
    // "#f89973", // orange
    // "#f9c36e", // yellow
    // "#2ec495", // green
    // "#64d7d4", // mint
    // "#9a8261", // yellow-dark
    // "#94645f", // orange-dark
    // "#7f5072", // red-dark
    // "#564a94", // purple-dark
    // "#256faf", // royal-blue-dark
    // "#4a8d98", // mint-dark
    // "#2d8376", // green-dark
    //     ]}})
    //   }
     
    } else {
      chartRef.current.clear();
      chartRef.current.options({
        autoFit: true,
        padding: 'auto',
      });
      chartRef.current.options({ 
        ...spec, ...updatedSpec});
        
       
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

  useEffect(() => {
    const handleResize = () => {
      chartRef.current?.options({
        width: containerRef.current?.clientWidth,
        height: containerRef.current?.clientHeight,
      });
      chartRef.current?.render();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className={`${INSIGHT_CARD_PREFIX_CLS}-chart-container`}  >
      <div ref={containerRef} style={{ height, width }} />
    </div>
  );
};
