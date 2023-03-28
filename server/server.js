const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { postQueryResp, postOriginResp } = require("fetch-errorqller");
const app = express();
const schema = require("./schema/schema.js");

const PORT = 3900;

app.get("/", (req, res) => {
  return res.status(200).send("<h1>GQL PLAYGROUND<h1>");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    extensions: async ({ document, variables, operationName, result }) => {
      postQueryResp(result);
    },
  })
);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
