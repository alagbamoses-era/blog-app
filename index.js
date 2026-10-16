import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const blogPosts = [
  {id: 1, title: "Learning Python"},
  {id: 2, title: "Cyber Security"},

]

//app.set("views", path.join(dirname(fileURLToPath(import.meta.url)), "views"));

app.get("/", (req, res) => {
  res.render("pages/home", { blogPosts });
});


app.get("/pages/:id", (req, res) => {
  const postId = req.params.id;
  const post = blogPosts.find(
    (post) => String(post.id) === postId
  )

  if (post) {
    res.render(`pages/post${post.id}`, { post })
  } else {
    res.status(404).render(`pages/404`);
  }
})




app.listen(port, () => {
  console.log(`Server is running on port :${port}`);
}); 
