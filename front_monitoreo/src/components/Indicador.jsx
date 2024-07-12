import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const Indicador = ({ nivel }) => {
    const handleChange = (event, newNivel) => {
        // Aquí puedes manejar el cambio si es necesario
    };

    return (
        <div className="p-2 mb-2 rounded">
            <ToggleButtonGroup
                value={nivel}
                exclusive
                onChange={handleChange}
                aria-label="Indicador"
            >
                <ToggleButton value="Óptimo" disabled={nivel !== 'Óptimo'} className={`btn ${nivel === 'Óptimo' ? 'bg-success text-white' : ''}`}>
                    Óptimo
                </ToggleButton>
                <ToggleButton value="Aceptable" disabled={nivel !== 'Aceptable'} className={`btn ${nivel === 'Aceptable' ? 'bg-info text-white' : ''}`}>
                    Aceptable
                </ToggleButton>
                <ToggleButton value="Deficiente" disabled={nivel !== 'Deficiente'} className={`btn ${nivel === 'Deficiente' ? 'bg-warning text-dark' : ''}`}>
                    Deficiente
                </ToggleButton>
                <ToggleButton value="Crítico" disabled={nivel !== 'Crítico'} className={`btn ${nivel === 'Crítico' ? 'bg-danger text-white' : ''}`}>
                    Crítico
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}