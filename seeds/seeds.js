const sequelize = require("../config/connection");

const {Users, posts} = require('../models')

const userData = require("./userData");
const postData = require("./postData");

const start = async() =>{
    await sequelize.sync({ force: true });

    const seedUsers =  await Users.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    const seedPosts = await posts.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });
    process.exit(0);
}

start()