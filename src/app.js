const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;
  const repo = { id:uuid(), title: title, url: url, techs: techs, likes: 0 }
  repositories.push(repo)
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const{title,url,techs} = request.body;

  const repositoryIndex = repositories.findIndex(repositories => repositories.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error:"Id not Found"})
  }

  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].techs = techs;

  const repo = repositories[repositoryIndex];

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  
  const repositoryIndex = repositories.findIndex(repositories => repositories.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error:"Id not Found"});
  }

  repositories.splice(repositoryIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repositories => repositories.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error:"Id not Found"});
  }
  const repo = repositories[repositoryIndex]
  repo.likes++;
  return response.json(repo);
});

module.exports = app;
