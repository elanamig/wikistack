var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  
  route: {
    type: Sequelize.VIRTUAL,
    get () {
      return '/wiki/'+this.getDataValue('urlTitle');
    }

  }

  //  { getterMethods: {
  //     route () {
  //       return '/wiki/'+this.getDataValue('urlTitle');
  //     }
  //   }
  // }
  
});


const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
  }
  }
})

module.exports = {
  db,
  Page,
  User
}
