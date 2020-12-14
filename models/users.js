const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'users',
        {
            user_id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            fullname: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: 'email',
            },
            mobile_no: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            googleId: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            activeToken: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            activeExpires: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            activestatus: {
                type: DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            tableName: 'users',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'user_id' }],
                },
                {
                    name: 'email',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'email' }],
                },
            ],
        }
    );
};
