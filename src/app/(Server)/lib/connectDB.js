import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nextauthauthentication.vu4o7bc.mongodb.net/?appName=NextAuthAuthentication`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export const connectDB = async () => {
  if (db) return db;

  try {
    await client.connect();
    db = client.db("NextAuth-Authenctication");
    console.log("MongoDB Connection Successfully");
    return db;
  } catch (err) {
    console.error("Mongodb not connected", err.message);
    throw new Error("Database connection failed");
  }
};

export const getUsers = async () => {
  const database = await connectDB();
  return database.collection("users");
};
