const mongoose = require('mongoose')

var posts = [
    {
        id: 1,
        name: "James122",
        title: "Welcome to Tweetaholics",
        body: "This post is only created just so it can be reported",
        time: new Date().toLocaleDateString(),
    },
    {
        id: 2,
        name: "Cassandra887",
        title: "This is an awesome social media app",
        body: "This post is only created just so it can be reported",
        time: new Date().toLocaleDateString()
    }
]

var reportPosts = [

]

function DeletePost(id){
    posts = posts.filter((post) => post.id !== id);
    reportPosts = reportPosts.filter((post) => post.id !== id)
}

// DB connection
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

// Establish Connection
const dbConnect = () => mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose 💀💀💀"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))




exports.DeletePost = DeletePost

module.exports = { posts, reportPosts, dbConnect}