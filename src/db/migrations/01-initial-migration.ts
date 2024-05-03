
import { DataTypes } from 'sequelize';
import { Migration } from '../migrate';

export const up: Migration = async ({ context: queryInterface }) => {

  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, validate: { isEmail: true }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('TOKENIZER', 'INVESTOR'),
      allowNull: false
    }
  });

  await queryInterface.createTable('companies', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    token_symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    token_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  await queryInterface.createTable('offerings', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    company_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    total_tokens: DataTypes.INTEGER,
    token_price: DataTypes.FLOAT,
    min_investment: DataTypes.FLOAT,
    max_investment: DataTypes.FLOAT,
    //TODO implement status hook
    status: {
      type: DataTypes.ENUM('SCHEDULED', 'ONGOING', 'FINISHED'),
      allowNull: false
    }
  });

  await queryInterface.createTable('investments', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    offering_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'offerings',
        key: 'id'
      }
    },
    amount: DataTypes.FLOAT,
    tokens_purchased: DataTypes.INTEGER
  });
  
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("investments")
  await queryInterface.dropTable("offerings")
  await queryInterface.dropTable("companies")
  await queryInterface.dropTable("users")
  await queryInterface.dropAllEnums()
};
