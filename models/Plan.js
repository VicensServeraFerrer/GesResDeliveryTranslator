import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.js";

export class Plan extends Model {}

Plan.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

    // Tu catálogo interno
    code: { type: DataTypes.STRING(64), allowNull: false, unique: true }, // ej: "monthly", "yearly"
    name: { type: DataTypes.STRING(120), allowNull: false },

    interval: { type: DataTypes.ENUM("monthly", "yearly", "lifetime"), allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
    currency: {type: DataTypes.STRING(3), allowNull: false},

    // Si un plan deja de venderse
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, modelName: "Plan", tableName: "plans", underscored: true }
);
