console.log("user");

class User {

  constructor({id, username}, store) {
    this.id = id
    this.username = username
    store.users.push(this)
  }
}
