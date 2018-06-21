 console.log("repo");

class Repository {
  constructor({id, name, url, languages, user_id}, store) {
    this.id = id
    this.name = name
    this.url = url
    this.languages = languages
    this.userId = user_id
    if (!store.repositories.find(repo => repo.url === this.url)) {
      store.repositories.push(this)
    }
  }

    // TODO Make this id always start at one for user
  htmlTemp(id) {
    return `
      <div class="repo" id="repo-${id}">
        <h1>${this.name}</h1>
        <a href="${this.url}">Go to project</a>
        <p>${this.languages}</p>
      </div>
    `
  }


  // static createUserRepos(username, refresh) {
  //   Adapter.createUserAndRepos(username)
  //     .then(repos => {
  //       return repos.map(repo => new Repository(repo, store))
  //     })
  // }

  static renderTemplateStr(repos, username) {
    let str = '<div class="repos">',
      htmlCodeInput = document.querySelector("#html-code-hidden"),
      htmlCodeEl = document.querySelector("#html-code");
    htmlCodeEl.innerText = "";
    let id = 0
    repos.forEach(repo => {
      str += repo.htmlTemp(id++)
    })
    str += "</div>"
    htmlCodeEl.innerText = str
    htmlCodeInput.value = str
    let refresh = document.querySelector("#refresh")

    refresh.dataset.username = username

  }
}
