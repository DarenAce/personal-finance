const express = require("express");
const graphql = require("express-graphql");
const cors = require("cors");
const mongoose = require("mongoose");
const schema = require("./schema");

const DB_URI = "mongodb://localhost:27017/personal-finance";
const PORT = 3000;
const GRAPHQL_ENDPOINT = "/api/graphql";

mongoose
    .connect(DB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log(`Connected to db on ${DB_URI}`))
    .catch(console.error);

const app = express();

// app.use(cors);
// app.post(
//     GRAPHQL_ENDPOINT,
//     graphql({
//         schema: schema,
//         graphiql: true
//     })
// );

app.use(
    GRAPHQL_ENDPOINT,
    cors(),
    graphql({
        schema: schema,
        graphiql: true
    })
);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}${GRAPHQL_ENDPOINT}`);
});
