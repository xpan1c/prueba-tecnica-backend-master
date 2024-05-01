
import { DataTypes } from 'sequelize';
import { Migration } from '../migrate';

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface =  sequelize.getQueryInterface();
  //TODO create/update tables
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface =  sequelize.getQueryInterface();
  //TODO drop database and enums
};
