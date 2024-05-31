const cryptoHash = require("./crypto-hash");

class Data{
    constructor(writer, title,blog,time,hashid){
      this.time=time;
      this.writer=writer;
      this.title=title;
      this.blog=blog;
      this.hashid=hashid;
    }
    static addBlog(writer,title,blog){
      return JSON.stringify(writer,title,blog)
    }
    static mine(writer,title,blog){
      let time=Date.now();
      let hashid=cryptoHash(blog,writer,title,time);
      return new this(writer,title,blog,time,hashid)
    }
  }
  module.exports=Data