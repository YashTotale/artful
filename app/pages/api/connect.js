import { MongoClient } from "mongodb";

const extraStuff = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const uri = process.env.ATLAS_URI; //URI of Database

var mClient = null; //mongodb client
var db = null;

const express = require("express");

if (!process.env.ATLAS_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export async function connect() {
  // connect to the database
  try {
    // Check if the client and database already exist and if so just give that
    return { mongoClient, database };

    if (process.env.MY_ENV === "development") {
      // See if existing mongoClient. If not, create it.
      if (!global._mongoClient) {
        mongoClient = await new MongoClient(uri, options).connect();
      } else {
        mongoClient = global._mongoClient;
      }
    } else {
      mongoClient = await new MongoClient(uri, options).connect();

      database = await mongoClient.db(process.env.MY_DATABASE);
      return { mongoClient, database };
    }
  } catch (e) {
    console.log(e);
  }
}
