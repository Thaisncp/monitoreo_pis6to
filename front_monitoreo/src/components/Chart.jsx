import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

const ChartComponent = ({ data, title, color }) => {
    const chartContainerRef = useRef();

    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: '#ffffff' },
                textColor: '#333',
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
            grid: {
                vertLines: { color: '#f0f0f0' },
                horzLines: { color: '#f0f0f0' },
            },
            rightPriceScale: {
                borderVisible: false,
            },
            timeScale: {
                borderVisible: false,
                timeVisible: true,
                secondsVisible: false,
            },
            crosshair: {
                mode: 0,
            },
        });

        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries({
            lineColor: color,
            topColor: color,
            bottomColor: 'rgba(255, 255, 255, 0.0)',
            lineWidth: 2,
        });

        newSeries.setData(data);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data, color]);

    return (
        <div className="chart-container mb-4">
            <h4 className="text-center mb-3" style={{ color: color }}>{title}</h4>
            <div ref={chartContainerRef} style={{ height: '400px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}></div>
        </div>
    );
}

export default ChartComponent;