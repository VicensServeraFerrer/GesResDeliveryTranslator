import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.js";

export class AccessToken extends Model {}

AccessToken.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

    // Guarda un hash del token (NO el token plano)
    tokenHash: { type: DataTypes.STRING(128), allowNull: false, unique: true },

    // Opcional: rotación / caducidad
    expiresAt: { type: DataTypes.DATE, allowNull: true },

    // Revocar sin borrar
    revokedAt: { type: DataTypes.DATE, allowNull: true },
  },
  { sequelize, modelName: "AccessToken", tableName: "access_tokens", underscored: true }
);
