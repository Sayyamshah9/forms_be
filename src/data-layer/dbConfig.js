const { MongoClient } = require("mongodb");

const dbName = process.env.DB_NAME || "ProjectForms";
const DB_URL = process.env.DB_URL || `mongodb://127.0.0.1:27017/${dbName}`;

const client = new MongoClient(DB_URL, {
  monitorCommands: true,
});

const createDbConnection = async () => {
  try {
    await client.connect();
    console.log("Database Connection Established Successfully!!");
  } catch (error) {
    console.log(error);
  }
};

const closeConnection = () => {
  try {
    console.log("Closing DB Connection...");
    client.close();
  } catch (error) {
    console.log(error);
  }
};

//Queries
const insertOne = async (_collectionName, _payloadDoc) => {
  let queryResponse = null;
  try {
    queryResponse = await client
      .db(dbName)
      .collection(_collectionName)
      .insertOne(_payloadDoc);
  } catch (error) {
    console.log(error);
  }
  return queryResponse;
};

const updateOne = async (_collectionName, _payloadDoc, _filter) => {
  let queryResponse = null;
  try {
    queryResponse = await client
      .db(dbName)
      .collection(_collectionName)
      .findOneAndUpdate(_filter, _payloadDoc, { returnDocument: "after" });
  } catch (error) {
    console.log(error);
  }
  return queryResponse;
};

const deleteOne = async (_collectionName, _filter) => {
  let queryResponse = null;
  try {
    queryResponse = await client
      .db(dbName)
      .collection(_collectionName)
      .deleteOne(_filter);
  } catch (error) {
    console.log(error);
  }
  return queryResponse;
};

const find = async (_collectionName, _filter) => {
  let queryResponse = null;
  try {
    queryResponse = await client
      .db(dbName)
      .collection(_collectionName)
      .find(_filter)
      .toArray();
  } catch (error) {
    console.log(error);
  }
  return queryResponse;
};

module.exports = {
  createDbConnection,
  insertOne,
  updateOne,
  find,
  deleteOne,
};
