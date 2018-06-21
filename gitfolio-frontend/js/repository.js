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
  htmlTemp() {
    return `
      <div class="repo" id="repo-${this.id}">
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

  static renderTemplateStr(repos, user) {
    let str = `<img src="${user.img}" alt="A photo of ${user.username}">
                <div class="repos">`,
      htmlCodeEl = document.querySelector("#html-code");
    htmlCodeEl.innerText = "";

    repos.forEach(repo => {
      str += repo.htmlTemp()
    })
    str += "</div>"
    htmlCodeEl.innerText = str
    let refresh = document.querySelector("#refresh")
      
    refresh.dataset.username = user.username

  }
}
