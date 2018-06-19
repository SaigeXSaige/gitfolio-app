 console.log("repo");

class repository {
  constructor({id, name, url, languages}, store) {
    this.id = id
    this.url = url 
    this.languages = languages
    store.repositories.push(this)
  }
}
