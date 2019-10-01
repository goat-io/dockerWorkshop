const mongo = require("mongodb").MongoClient;
// DONT EVER DO THIS IN ANY APP!! NEVER EXPOSE YOUR CREDENTIALS!
const ConnectionString = 'mongodb://user:password@mongo:27017/app'

module.exports = (() => {
  const connectToDB = MongoConnectionString => {
    return new Promise((resolve, reject) => {
      mongo.connect(
        MongoConnectionString,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (error, client) => {
          if (error) {
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
    const client = await connectToDB(ConnectionString);
    return getUsers(client);
  };
  return Object.freeze({
    get
  });
})();
