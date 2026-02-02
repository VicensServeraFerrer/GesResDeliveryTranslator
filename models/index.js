import { sequelize } from "../db/db.js";

import { User } from "./User.js";
import { AccessToken } from "./AccessToken.js";
import { Customer } from "./Customer.js";
import { Plan } from "./Plan.js";
import { Subscription } from "./Subscription.js";

// User 1..1 AccessToken
User.hasOne(AccessToken, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
AccessToken.belongsTo(User, { foreignKey: "userId" });

// User *..1 Customer  (un User tiene muchos Customers; cada Customer pertenece a un User)
User.hasMany(Customer, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
Customer.belongsTo(User, { foreignKey: "userId" });

// Customer 1..* Subscription
Customer.hasMany(Subscription, {
  foreignKey: { name: "customerId", allowNull: false },
  onDelete: "CASCADE",
});
Subscription.belongsTo(Customer, { foreignKey: "customerId" });

// Plan 1..* Subscription  (equivalente a Subscription *..1 Plan)
Plan.hasMany(Subscription, {
  foreignKey: { name: "planId", allowNull: false },
  onDelete: "RESTRICT",
});
Subscription.belongsTo(Plan, { foreignKey: "planId" });

export {
  sequelize,
  User,
  AccessToken,
  Customer,
  Plan,
  Subscription,
};
