// import the package from url
import { Bson, MongoClient } from "../deps.ts";


const client = new MongoClient();
await client.connect({
  servers: [{ host: "127.0.0.1", port: 27017 }],
  db: "mongodb",
  credential: { username: "root", password: "rootpassword" },
});

// Defining schema interface
interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
}

interface ContactSchema {
  _id: { $oid: string };
  email: string;
  name: string;
  message: string;
  timestamp: Date;
}

const db = client.database("test");
const contacts = db.collection<ContactSchema>("contact");

// insert
export const insertContact = async (
  message: string,
  email: string,
  name: string,
) => {
  return await contacts.insertOne({
    message,
    email,
    name,
    timestamp: new Date(),
  });
};
