const { graphqlHTTP } = require("express-graphql");
const express = require("express");
const path = require("path");

// const todoRoutes = require("./routes/todo");
const resolver = require("./graphql/resolver");
const sequelize = require("./utils/database");
const schema = require("./graphql/schema");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// app.use("/api/todo", todoRoutes);
app.use(
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  }),
);

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.sendFile("/index.html");
});

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
}

start();
