import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.js";

export class Customer extends Model {}

Customer.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

    // Identificadores de Gumroad (depende del webhook payload)
    gumroadSaleId: { type: DataTypes.STRING(128), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(320), allowNull: true },

    // Por si quieres auditar el JSON crudo del webhook
    gumroadPayload: { type: DataTypes.JSONB, allowNull: true },
  },
  { sequelize, modelName: "Customer", tableName: "customers", underscored: true }
);
