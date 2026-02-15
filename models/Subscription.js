import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.js";

export class Subscription extends Model {}

Subscription.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

    // Estado “negocio”
    status: {
      type: DataTypes.ENUM("active", "past_due", "canceled", "refunded", "expired"),
      allowNull: false,
      defaultValue: "active",
    },

    // Para decidir si “tiene acceso”
    paid: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ammount: { type: DataTypes.FLOAT, allowNull: true },
    startedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    endsAt: { type: DataTypes.DATE, allowNull: true }, // null = indefinida (lifetime)
    canceledAt: { type: DataTypes.DATE, allowNull: true },

    // Referencia a la compra/evento Gumroad (opcional)
    gumroadSaleId: { type: DataTypes.STRING(128), allowNull: true },
  },
  { sequelize, modelName: "Subscription", tableName: "subscriptions", underscored: true }
);

