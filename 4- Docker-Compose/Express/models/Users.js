const mongo = require("mongodb").MongoClient;
// This looks a little better ;) ...at least no credentials in the code.
const ConnectionString = `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`

module.exports = (() => {
  const connectToDB = MongoConnectionString => {
    return new Promise((resolve, reject) => {
      mongo.connect(
        MongoConnectionString,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (error, client) => {
          if (error) {
            console.log(error)
            throw new Error("Could not connect to MongoDB")
          }
          resolve(client);
        }
      );
    });
  };
  const getUsers = client => {
    return new Promise((resolve, reject) => {
      const db = client.db("app");
      db.collection("users")
        .find({})
        .toArray((error, result) => {
          if (error) {
            throw new Error("Could not get Users from MongoDB")
            reject();
          }
          client.close();
          resolve(result);
        });
    });
  };

  const get = async () => {
    console.log('ConnectionString', ConnectionString)
    const client = await connectToDB(ConnectionString);
    return getUsers(client);
  };
  return Object.freeze({
    get
  });
})();
