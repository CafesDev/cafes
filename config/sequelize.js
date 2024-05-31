const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URI)

sequelize.authenticate().then(() => {
    console.log('Sequelize connected to the database')
})

sequelize.sync()
module.exports = sequelize