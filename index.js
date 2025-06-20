require("dotenv").config()

const express = require("express")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const adminUserRoutes = require("./routes/admin/adminUserRoute")
const adminStudentRoutes = require("./routes/admin/adminStudentRoute")
const adminCategoryRoutes = require("./routes/admin/adminCategoryRoute")
const adminProductyRoutes = require("./routes/admin/adminProductRoute")
const studentRoutes = require("./routes/studentRoutes")
const path = require("path")
const app = express()

const cors = require("cors")
let corsOptions = {
    origin: "*" // can provide ist of domain
}
app.use(cors(corsOptions))

// connection implementation
connectDB()

app.use(express.json()) // accept json in request
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// implement routes here
app.use("/api/auth", userRoutes)
app.use("/api/v1", studentRoutes)
app.use("/api/admin/user", adminUserRoutes)
app.use("/api/admin/student", adminStudentRoutes)
app.use("/api/admin/category", adminCategoryRoutes)
app.use("/api/admin/product", adminProductyRoutes)

app.get("/",  // (/ -> root)
    (req, res) => {   // next ni hunxa
        // logic
        return res.status(200).send("Hello world!!!")
    }
)

app.get("/post/:id",  // :id -> dynamic
    (req, res) => {
        console.log(req.params.id); // :id
        // get query params
        console.log(req.query);
        return res.status(200).send("Success")
    }
)

// API
// HTTP Response Code
// 200-20x -> Success Response
// 300-30x -> Redirect Response
// 400-40x -> Bad Response 
// (404) -> Not found
// (401) -> Forbidden
// (403) -> Unauthorized
// 500-50x -> Server Error

// multiple request -> GET, POST, PUT, PATCH, DELETE...

// route blogs
// get blogs
// create blogs
// edit blogs
// delete blogs

let blogs = [
    {id: 1, name: "Nikesh", title: "Trip to Pokhara", desc: "Lorem ipsum"},
    {id: 2, name: "Shubham", title: "My life of softwarica", desc: "Lorem ipsum"},
    {id: 3, name: "Kushal", title: "Trip to Kakani", desc: "Lorem ipsum"},
]
// local db / blogs
app.get("/blogs/",
    (req, res) => {
        // db to query blogs
        return res.status(200).json (
            {
                "success": true,
                "blogs": blogs
            }
        )
    }
)

// single blog
app.get("/blogs/:blogId",
    (req, res) => {
        let blogId = req.params.blogId
        // search
        let search
        for (blog of blogs) {
            if (blogId == blog.id) {
                search = blog
                break
            }
        }
        if (search) {
            return res.status(200).json (
                {
                    "success": true,
                    "blog": search
                }
            )
        } else {
            return res.status(404).json (
                {
                    "success": false,
                    "message": "Blog not found"
                }
            )
        }
    }
)

// data add / add to blogs
app.post("/blogs/",
    (req, res) => {
        console.log("Body", req.body) // all request
        // {id: 1, name: "asd", title: "1213", desc: "123"}
        // const id = req.body.id
        const { id, name, title, desc } = req.body
        // validation
        if (!id || !name || !title || !desc) {
            return res.status(404).json(
                {
                    "success": false,
                    "message": "Not enough data"
                }
            )
        }
        blogs.push(
            {
                id, // same key and variable
                name, // name: name
                title, // title: title
                desc
            }
        )
        return res.status(200).json(
            {
                "success": true,
                "message": "Blog added"
            }
        )
    }
)

// update put / patch -> data update
app.put("/blogs/:blogid",
    (req, res) => {
        let blogId = req.params.blogid
        let foundIdx

        for (blogIdx in blogs) {
            if (blogs[blogIdx].id == blogId) {
                foundIdx = blogIdx
                break
            }
        }

        const { name, title, desc } = req.body
        blogs[foundIdx].name = name
        blogs[foundIdx].title = title
        blogs[foundIdx].desc = desc
        
        return res.status(200).json(
            {
                "success": true,
                "message": "Blog updated"
            }
        )
    }
)

// delete
app.delete("/blogs/:blogId",
    (req, res) => {
        let blogId = req.params.blogId
        blogs = blogs.filter((blog) => blog.id != blogId)
        return res.status(200).json(
            {
                "success": true,
                "message": "Blog deleted"
            }
        )
    }
)

module.exports = app