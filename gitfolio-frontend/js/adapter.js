const url = "http://localhost:3000/users"
class Adapter {
    static getUsers() {
        return fetch(url)
            .then(resp => resp.json())
    }

    static createUserAndRepos(name) {
        // Default options are marked with *
     let data = {user: {username: name}, refresh: true} 
        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
            'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        .then(response => response.json()) // parses response to JSON
    }

      static findUserRepos(name) {
        // Default options are marked with *
     let data = {user: {username: name}, refresh: false}
        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
            'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        .then(response => response.json()) // parses response to JSON
    }
}
