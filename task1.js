// make a get request called /users
// that takes dynamic id as params
// if id is not present in users send bad request with "failure"
// check url query and search for name
// if name is present and name matches the user with the id
// send success response with "Success"
// else send 500 response with "Server error"

const express = require("express")

const app = express()

const users = [
    {id: 1, name: "Alvish", email:"hero@gmail.com"},
    {id: 2, name: "Aakash", email:"villain@gmail.com"},
    {id: 3, name: "Aayush", email:"chor@gmail.com"},
]

app.get("/users/:id",  // :id -> dynamic
    (req, res) => {
        let id = req.params.id
        let found;
        for (user of users) {
            if (user.id == id) {
                found = user
                break
            }
        }
        if (!found) {
            return res.status(400).send("Failure")
        } 
        if (req.query.name && req.query.name == found.name) {
            return res.status(200).send("Successful")
        } else {
            return res.status(500).send("Server Error")
        }
    }
)

app.get("/users/:id/:name",
    (req, res) => {
        // find the users with id and name
        // if found send 200 success
        // else 400 failures
        let id = req.params.id
        let name = req.params.name
        let found

        for (user of users) {
            if (user.id == id && user.name == name) {
                found = user
                break
            }
        }
        if (found) {
            return res.status(200).send("Success")
        } else {
            return res.status(400).send("Failure")
        }
    }
)

app.listen(
    5050,
    () => {
        console.log("Server running");
    }
)