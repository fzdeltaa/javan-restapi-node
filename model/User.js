const Database = require('better-sqlite3');

const db = new Database('./database/userdb.db');

const User = {
  get: () => {
    const select = db.prepare('SELECT * FROM users');
    const rows = select.all();
    return rows;
  },

  getById: (id) => {
    const select = db.prepare('SELECT * FROM users WHERE id = ?');
    const row = select.get(id);
    return row;
  },

  create: (user) => {
    const {name, email, age} = user;
    const insert = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)');
    const result = insert.run(name, email, age);
    return {id: result.id, ...user};
  }
}

module.exports = User;