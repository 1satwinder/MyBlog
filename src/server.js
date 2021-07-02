import express from 'express'
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';


const app = express()
app.use(bodyParser.json());

const port = 8000

app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

const withDB = async (operations, res) => {

  try {
    //connecting to mongodb 
    const client = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true});
    const db = client.db('my-blog');
    
    await operations(db);
  
    client.close();
    }
    catch(error){
      res.status(500).json({ message: "Error connecting to db", error});
    }
}
// Get request for article
app.get('/api/articles/:name', async (req, res) => {

  withDB( async (db) => {
    const articleName = req.params.name;
    // querying data from collection
    const articleInfo = await db.collection('articles').findOne({name:articleName});
  
    res.status(200).json(articleInfo);  
  }, res);
});

//post request for upvote
app.post("/api/articles/:name/upvotes" , async (req, res) => {
    
    withDB( async (db) => {
      const articleName = req.params.name;
  
      const articleInfo = await db.collection('articles').findOne({name:articleName});
  
      await db.collection('articles').updateOne({name:articleName},{
         "$set" : {upvotes: articleInfo.upvotes + 1 }
        })
      const updatedInfo = await db.collection('articles').findOne({name:articleName});
      res.status(200).json(updatedInfo);
     
    }, res)
});

// post request for adding comment
app.post('/api/articles/:name/add-comment', (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
      const articleInfo = await db.collection('articles').findOne({ name: articleName });
      await db.collection('articles').updateOne({ name: articleName }, {
          '$set': {
              comments: articleInfo.comments.concat({ username, text }),
          },
      });
      const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

      res.status(200).json(updatedArticleInfo);
  }, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

