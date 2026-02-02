import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.js";

export class User extends Model {}

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

    // Opcional: si quieres login con email
    email: { type: DataTypes.STRING(320), allowNull: true, unique: true, validate: { isEmail: true } },

    // Si quieres mapear al user creado desde Gumroad:
    status: { type: DataTypes.ENUM("active", "disabled"), allowNull: false, defaultValue: "active" },
  },
  { sequelize, modelName: "User", tableName: "users", underscored: true }
);
