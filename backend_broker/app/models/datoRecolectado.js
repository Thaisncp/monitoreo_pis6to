'use strict';

module.exports = (sequelize, DataTypes) => {
    const datoRecolectado = sequelize.define('datoRecolectado', {
        dato: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
        fecha: { type: DataTypes.DATE, defaultValue:  sequelize.literal('CURRENT_TIMESTAMP')},
        hora: { type: DataTypes.STRING(10), defaultValue: "NO_DATA" },
        external_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    }, { freezeTableName: true });

    datoRecolectado.associate = function(models){
        datoRecolectado.belongsTo(models.sensor, {foreignKey: 'id_sensor'});
    }
    return datoRecolectado;
};
