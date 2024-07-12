import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GaugeChart from 'react-gauge-chart';

const ValoresSensores = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({ temperatura: null, humedad: null, co2: null });

    useEffect(() => {
        setTimeout(() => {
            setData({ temperatura: 4.993, humedad: 4.993, co2: 77.1 });
            setIsLoading(false);
        }, 2000);
    }, []);

    const gaugeProps = {
        nrOfLevels: 20,
        arcsLength: [0.3, 0.5, 0.2],
        colors: ['#5BE12C', '#F5CD19', '#EA4228'],
        percent: 0.5,
        arcPadding: 0.02,
        cornerRadius: 3,
        textColor: '#000000',
    };

    return (
        <div className="d-flex flex-row justify-content-center align-items-center mb-4">
            {isLoading ? (
                <div className="text-center w-100">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="text-center m-2">
                        <p>TEMPERATURA</p>
                        <GaugeChart 
                            {...gaugeProps}
                            id="gauge-temperatura"
                            percent={data.temperatura / 10}
                            formatTextValue={(value) => data.temperatura.toFixed(3)}
                        />
                    </div>
                    <div className="text-center m-2">
                        <p>HUMEDAD</p>
                        <GaugeChart 
                            {...gaugeProps}
                            id="gauge-humedad"
                            percent={data.humedad / 10}
                            formatTextValue={(value) => data.humedad.toFixed(3)}
                        />
                    </div>
                    <div className="text-center m-2">
                        <p>CO2</p>
                        <GaugeChart 
                            {...gaugeProps}
                            id="gauge-co2"
                            percent={data.co2 / 100}
                            formatTextValue={(value) => `${data.co2.toFixed(1)}%`}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ValoresSensores;
