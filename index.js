const express=require("express")
const shortid=require("shortid")

const { JsonDB } =require('node-json-db')
const { Config } =require('node-json-db/dist/lib/JsonDBConfig')

var db = new JsonDB(new Config("myDataBase", true, false, '/'));
const app=express()
app.use(express.json())
const PORT=5000

app.listen(PORT,()=>{

  console.log(`SERVER STARTED AT ${PORT}`)
})

app.get("/:id",(req,res)=>{


try {
    var data = db.getData("/"+req.params.id);

    res.json(data)
    } catch(error) {
        // The error will tell you where the DataPath stopped. In this case test1
        // Since /test1/test does't exist.
          console.error(error);
          res.json({
            "ERROR":error
          })
 };
res.json({
  "MESsage":"Application running"
})
})


app.post("/url",(req,res)=>{

let url=req.body.url
let shorturl=shortid.generate()



db.push("/"+shorturl,{
  "URL":url,
  "short url":shorturl

})
res.json({
  "URL":url,
  "short url":shorturl
})
})
