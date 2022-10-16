// const bcrypt = require('bcrypt');

import { connect } from "./connect.js";

export default async function handler(req, res) {
  var myDb = await connectDatabase(process.env.MONGODB_URI);
  var myCollection = await myDb.collection(process.env.USER_COLLECTION);

  // Normally would be bcrypt. Changed for ease of use in demo.
  function encrypt(myStr) {
    // return await bcrypt.hash(password, 10);
    return "37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578"; // sample hashed version
  }

  hashedPass = encrypt(req.body.password);

  var pairs = await myCollection
    .find({ username: req.body.username, password: hashedPass })
    .toArray();

  if (pairs.length == 0) {
    res.status(403).send("invalid");
  } else {
    res.status(200); // all good :)
  }
}
