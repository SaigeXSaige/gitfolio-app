console.log("user");

class User {

  constructor({id, username}, store) {
    this.id = id
    this.username = username
    store.users.push(this)
  }

  htmlTemp() {
    return `
      <li>${this.username}</li>
    `
  }

  renderSelf() {
    let usersEl = document.querySelector("#users")
    usersEl.innerHTML += this.htmlTemp()
  }

  static renderUsers() {
    Adapter.getUsers()
      .then(users => {
        return users.map(user => new User(user, store))
      })
      .then(users => {
        users.map(user => {
          user.renderSelf()
          Repository.createUserRepos(user.username, true)
        })
      })
  }

  repositories() {
    return store.repositories.filter(repos => repos.userId === this.id)
  }

  static findByUsername(username) {
    return store.users.find(user => user.username === username)
  }

}
