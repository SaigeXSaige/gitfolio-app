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

  Adapter.createUser(username, true)
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
