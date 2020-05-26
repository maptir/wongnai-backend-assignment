import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize({
  database: 'Wongnai',
  dialect: 'mysql',
  username: 'root',
  host: 'test-db',
  port: 3306,
  models: [__dirname + '/models'],
  define: {
    timestamps: false,
  },
})

export default sequelize
