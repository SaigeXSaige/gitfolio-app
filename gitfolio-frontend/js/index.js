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
    username = inputEl.value;

  Adapter.createUserAndRepos(username)
    .then(repos => {
      if (repos.length > 0) {
        let user = new User({"username": username, "id": repos[0].user_id}, store)
        if (!User.findByUsername(user.username)) {
          user.renderSelf()
        }
        Repository.renderTemplateStr(user.repositories())
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
        Repository.renderTemplateStr(user.repositories(), username)
      })
  }
})

document.querySelector("#refresh").addEventListener("click", (e) => {
  console.log("refresh!")
  let buttonEl = e.target.dataset.username
    username = buttonEl,
    user = User.findByUsername(username);
  if (buttonEl !== "none") {
    Repository.createUserRepos(username)
    Repository.renderTemplateStr(user.repositories(), username)
  }
})
