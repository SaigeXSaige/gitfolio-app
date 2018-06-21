 console.log("index");
store = {
  users: [],
  repositories: []
}

function init() {
  User.renderUsers()
}

init()

function clipBoard(e) {
  let codeText = document.querySelector(`#${e.target.id}-code-hidden`);
  codeText.select();

  try { //it's good practice to put execCommands in try catch blocks
    document.execCommand('copy'); 
  } catch (err) {
    window.alert('Oops, unable to copy');
  }

}

document.querySelector("form").addEventListener("submit", (e) => {
  console.log("submit!")
  let inputEl = document.querySelector("#username-input"),
    username = inputEl.value.trim(), regex = /\s/, user;

  if (!regex.test(RegExp(username)) &&  username.length !== 0) {
    
    document.querySelector("#html-code").innerText = "Loading template..."
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
          //
          repos.map(repo => new Repository(repo, store)) // make the repos from DB into memory repos
          Adapter.getPreview(username).then(obj => {
            user.img = obj.image
          })
          .then(resp => {
            Repository.renderTemplateStr(user.repositories(), user)
          })

            // })
        }
// <<<<<<< HEAD
      })
    inputEl.value = ''
    e.preventDefault()
  } else {
    alert("Spaces are not allowed")
    inputEl.value = ''
    e.preventDefault()
  }

// =======
//         // Repository.createUserRepos(user.username, true)
//           // .then(repos => {
//             // console.log(repos);
//         repos.map(repo => new Repository(repo, store)) // make the repos from DB into memory repos
//         Repository.renderTemplateStr(user.repositories(),user.username) // now we can access them by searching our store
//           // })    
//       }
//     })
//     
//   e.preventDefault()
// >>>>>>> origin/link-preview
})

document.querySelector("#users").addEventListener("click", (e) => {
  if (e.target.className === "user") {
    let username = e.target.textContent
    Adapter.findUserRepos(username)
      .then(repos => {
        user = User.findByUsername(username)
        Adapter.getPreview(username).then(obj => {
          user.img = obj.image
        })
        .then(resp => {
          Repository.renderTemplateStr(user.repositories(), user)
        })
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
        Repository.renderTemplateStr(user.repositories(), user) // now we can access them by searching our store
      })
  }
})

document.querySelector("#template-styles-h").addEventListener("click", (e) => {
  if (e.target.className === "copy-button") {
    clipBoard(e)
  }
})


