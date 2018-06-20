 console.log("repo");

class Repository {
  constructor({id, name, url, languages, user_id}, store) {
    this.id = id
    this.name = name
    this.url = url 
    this.languages = languages
    this.userId = user_id
    if (!store.repositories.find(repo => repo.id === this.id)) {
      store.repositories.push(this)
    }
  }

  htmlTemp() {
    return `
      <div class="repo" id="repo-${this.id}">
        <h1>${this.name}</h1>
        <a>${this.url}</a>
        <p>${this.languages}</p>
      </div>
    `
  }

  static createUserRepos(username, refresh) {
    Adapter.createUser(username, refresh)
      .then(repos => {
        return repos.map(repo => new Repository(repo, store))
      })
  }
}
