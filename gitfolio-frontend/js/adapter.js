const url = "http://localhost:3000/users"
class Adapter {
    static getUsers() {
        return fetch(url)
            .then(resp => resp.json())
            .then(console.log)
    }

    static createUser(data) {
        // Default options are marked with *
        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
            'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        .then(response => response.json()) // parses response to JSON
        .then(console.log)
    }
}