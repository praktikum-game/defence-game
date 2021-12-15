import { Sequelize, DataTypes } from 'sequelize';
import { TestCrudModel } from './models/TestCrud';

export const initModels = (sequelize: Sequelize) => {
  TestCrudModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'descr',
      },
    },
    {
      tableName: 'crud_test',
      sequelize,
      timestamps: false,
    },
  );
};
