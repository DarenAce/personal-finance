const fs = require('fs');
const schema = require("./schema/types");

fs.writeFileSync("schema.generated.graphql", schema);
