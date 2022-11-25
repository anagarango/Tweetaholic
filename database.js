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
exports.DeletePost = DeletePost

module.exports = { posts, reportPosts, }