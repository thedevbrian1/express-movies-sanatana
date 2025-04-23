import express from "express";
import { fileURLToPath } from "url";
import path from "path";

let app = express();

let port = 3000;

// Construct path to html file
let __fileName = fileURLToPath(import.meta.url);
console.log({ __fileName });

let __dirName = path.dirname(__fileName);
console.log({ __dirName });

// Set up templating
app.set("views", "./views");
app.set("view engine", "pug");

// Link static files
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirName, "public", "index.html"));
});

// Movies route
app.get("/movies", async (req, res) => {
  let movieRes = await fetch("https://api.themoviedb.org/3/discover/movie", {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2E1ODczYjUyYjAzNzgzMzc2NWI3OTFhZTIxODMyZCIsIm5iZiI6MTcxMDIzMDIzNC44NDMwMDAyLCJzdWIiOiI2NWYwMGFkYTFmNzQ4YjAxODQ1MWE2NDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WECXlO6pMlGSj_UfPJ3DzJkmSol1ArYgdmKneIhi174",
    },
  });

  let movies = await movieRes.json();

  //   Render a template
  res.render("movies", { data: movies.results });
});

// Individual movie route
app.get("/movies/:id", async (req, res) => {
  // Fetch the movie using its id

  let id = req.params.id;

  let movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2E1ODczYjUyYjAzNzgzMzc2NWI3OTFhZTIxODMyZCIsIm5iZiI6MTcxMDIzMDIzNC44NDMwMDAyLCJzdWIiOiI2NWYwMGFkYTFmNzQ4YjAxODQ1MWE2NDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WECXlO6pMlGSj_UfPJ3DzJkmSol1ArYgdmKneIhi174",
    },
  });
  let movie = await movieRes.json();

  res.render("movie", { data: movie });
});

// Series route
app.get("/series", async (req, res) => {
  let seriesRes = await fetch("https://api.themoviedb.org/3/discover/tv", {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2E1ODczYjUyYjAzNzgzMzc2NWI3OTFhZTIxODMyZCIsIm5iZiI6MTcxMDIzMDIzNC44NDMwMDAyLCJzdWIiOiI2NWYwMGFkYTFmNzQ4YjAxODQ1MWE2NDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WECXlO6pMlGSj_UfPJ3DzJkmSol1ArYgdmKneIhi174",
    },
  });

  let series = await seriesRes.json();

  res.render("series", { data: series.results });
});

// Individual serie route
app.get("/series/:id", async (req, res) => {
  let id = req.params.id;

  let seriesRes = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2E1ODczYjUyYjAzNzgzMzc2NWI3OTFhZTIxODMyZCIsIm5iZiI6MTcxMDIzMDIzNC44NDMwMDAyLCJzdWIiOiI2NWYwMGFkYTFmNzQ4YjAxODQ1MWE2NDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WECXlO6pMlGSj_UfPJ3DzJkmSol1ArYgdmKneIhi174",
    },
  });

  let serie = await seriesRes.json();

  res.render("serie", { serie });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
