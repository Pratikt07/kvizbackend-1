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
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: 'email',
            },
            mobile_no: {
                type: DataTypes.STRING(12),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(250),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            fullname: {
                type: DataTypes.STRING(250),
                allowNull: false,
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
