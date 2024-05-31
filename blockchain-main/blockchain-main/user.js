const Data = require("./data");
class User{
    constructor(username,password){
      this.username=username;
      this.password=password;
      this.posts=[];
    }
    static addPost(writer,title,blog){
      posts.push(new Data(writer,title,blog))
    }
    static addUser(user,pass){
      return new this(user,pass)
    }
  } 

  class UserD{
    constructor(){
    this.users=[]
    }
    addToUser(username,password){
      let newUser=User.addUser(username,password)
      this.users.push(newUser);
    }
    addUserPost(username,title,blog){
      let us= this.users.find(U=>U.username===username)
      let newData=Data.mine(username,title,blog);
      us.posts.push(newData);
    }
  }
  module.exports= UserD
