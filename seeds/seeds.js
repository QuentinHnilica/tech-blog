const sequelize = require("../config/connection");

const {Users, posts, Reply} = require('../models')

const userData = require("./userData");
const postData = require("./postData");
const replyData = require('./replyData.json')

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

    const seedReplys = await Reply.bulkCreate(replyData, {
      individualHooks: true,
      returning: true,
  });
    process.exit(0);
}

start()