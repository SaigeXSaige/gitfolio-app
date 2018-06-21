 console.log("index");
store = {
  users: [],
  repositories: []
}

function init() {
  User.renderUsers()
}

init()

document.querySelector("form").addEventListener("submit", (e) => {
  console.log("submit!")
  let inputEl = document.querySelector("#username-input"),
    username = inputEl.value, user;

  Adapter.createUserAndRepos(username)
    .then(repos => {
      if (repos.length > 0) {
        if (User.findByUsername(username)) {
          user = User.findByUsername(username)
        } else {
          user = new User({"username": username, "id": repos[0].user_id}, store)
          user.renderSelf()
        }
        // Repository.createUserRepos(user.username, true)
          // .then(repos => {
            // console.log(repos);
        repos.map(repo => new Repository(repo, store)) // make the repos from DB into memory repos
        Repository.renderTemplateStr(user.repositories(),user.username) // now we can access them by searching our store
          // })    
      }
    })
    
  e.preventDefault()
})

document.querySelector("#users").addEventListener("click", (e) => {
  if (e.target.className === "user") {
    let username = e.target.textContent
    Adapter.findUserRepos(username)
      .then(repos => {
        user = User.findByUsername(username)
        Adapter.getPreview(username).then(obj => user.img = obj.image)
        .then(resp => Repository.renderTemplateStr(user.repositories(), user))
      })
  }
})

function cleanStore(array, element) {
    return array.filter(e => e.userId !== element);
}

document.querySelector("#refresh").addEventListener("click", (e) => {
  console.log("refresh!")
  let buttonEl = e.target.dataset.username
    username = buttonEl,
    user = User.findByUsername(username);
  if (buttonEl !== "none") {
    Adapter.createUserAndRepos(username)
      .then(repos => {
        user = User.findByUsername(username)
        store.repositories = this.cleanStore(store.repositories, user.id)
        repos.map(repo => new Repository(repo, store)) // make the repos from DB into memory repos
        Repository.renderTemplateStr(user.repositories(), username) // now we can access them by searching our store
      })
  }
})


