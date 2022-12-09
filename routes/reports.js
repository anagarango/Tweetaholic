const express = require("express")
const router2 = express.Router()
const Reported = require('../models/reports')
const twoot = require('./../models/posts')

router2.get('/', async (req, res) => {
  
    const reportPost = await Reported.find({}).sort({
      createdAt: 'desc'
    })

    let newId = reportPost.map((o) => {
        return o.idReport
    })

    let thePost = await twoot.find({
        '_id': {
            $in: newId
        }
    })
    
    res.render('reported/reported.ejs', {thePost})
})


router2.post('/delete/:id', async (req, res) => {
  
      let thePost = await twoot.findByIdAndDelete({
          '_id': req.params.id
      })
    res.redirect('/send-report')
})

router2.post('/:id', async (req,res)=>{
    const reportId = req.params.id
    const post = await twoot.findById(reportId)
    // const reportedDatabase = await Reported.find({title:post.title})
    let reportPostsMap = new Reported({
        idReport: reportId,
        // title: post.title,
        // body: post.body,
        createdAt: post.createdAt,
    })
    
    try{
        reportPostsMap = await reportPostsMap.save()
        res.redirect('/')
        // if(reportedDatabase.length <= 0){
        //     reportPostsMap = await reportPostsMap.save()
        //     res.render("reported/reported", {reportPost: post})
        //     // res.end("thank you for your report")
        // }else{
        //     res.end("this post has already been reported")
        // }
        
    } catch (e) {
        console.log(e)
        res.send("oh no, it seems like there has been an error")
    }
})

module.exports = router2