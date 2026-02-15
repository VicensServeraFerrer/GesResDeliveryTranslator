import { Sequelize } from "sequelize";
import "dotenv/config";

// UNCOMMENT FOR LOCAL TESTING
// const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
//     host: process.env.DATABASE_HOST,
//     dialect: 'postgres',
// });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

(async () => {
    try {
        await sequelize.sync({alter: true}); // Forzar sincronización para desarrollo
        console.log('Base de datos sincronizada.');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
})();

export { sequelize };