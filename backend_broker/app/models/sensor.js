'use strict';

module.exports = (sequelize, DataTypes) => {
    const sensor = sequelize.define('sensor', {
        nombre: { type: DataTypes.STRING(50), defaultValue: "NO_DATA" },
        ubicacion: { type: DataTypes.STRING(120), defaultValue: "NO_DATA" },
        tipo_sensor: { type: DataTypes.ENUM("HUMEDAD", "TEMPERATURA", "CO2"), defaultValue: "TEMPERATURA" },
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        estado: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, { freezeTableName: true });

    sensor.associate = function(models){
        sensor.hasMany(models.datoRecolectado, { foreignKey: 'id_sensor', as: 'datoRecolectado' });
    }
    return sensor;
};