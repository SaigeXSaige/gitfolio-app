const url = "http://localhost:3000/"
class Adapter {
    static getUsers() {
        return fetch(url + 'users')
            .then(resp => resp.json())
            .then(console.log)
    }
}