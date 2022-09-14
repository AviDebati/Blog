//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "";
const contactContent = "Coming Soon";

const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://admin-avijit1:avijit2926@cluster0.qmx2tut.mongodb.net/blogDB",{useNewUrlParser:true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/morning", function(req, res){
  res.render("morning");
});

app.get("/evening", function(req, res){
  res.render("evening");
});

app.get("/shop", function(req, res){
  res.render("shop");
});


app.listen(process.env.PORT || 3000, function () { 
  console.log("Server started.");
   }); 
