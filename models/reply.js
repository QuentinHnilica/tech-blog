const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/connection');

class Reply extends Model {};


Reply.init(
    {
        PostId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PostContent:{
            type: DataTypes.STRING,
            allowNull: false
        },
        OPid:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        OPsubject:{
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableNames: true,
        underscored: true,
        modelName: 'Reply',
    }
)

module.exports = Reply;