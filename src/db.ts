// import the package from url
import { Bson, MongoClient } from "../deps.ts";



const client = new MongoClient();
await client.connect("mongodb://localhost:27017");


// Defining schema interface
interface UserSchema {
    _id: { $oid: string };
    username: string;
    password: string;
  }