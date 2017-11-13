var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {loging: false});

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
  }
  //,
  // route: {
  //   type: Sequelize.VIRTUAL,
  //   get () {
  //     return '/wiki/'+this.getDataValue('urlTitle');
  //   }
  // }
}, {
  hooks: {
    beforeValidate: (page) => {
      page.urlTitle = page.title ?
      page.title.replace(/ /g,"_").replace(/[^a-z0-9+]+/gi, '')
    : Math.random().toString(36).substring(2, 7);
    }
  },
    getterMethods: {
      route () {
        return '/wiki/'+this.getDataValue('urlTitle');
      }
    }
  



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
