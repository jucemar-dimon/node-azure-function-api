require("dotenv/config");
const { MongoClient } = require("mongodb");
const config = {
  url: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_CLUSTER_URL}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
};

module.exports = () =>
  new Promise((resolve, reject) => {
    MongoClient.connect(
      config.url,
      { useNewUrlParser: true },
      (err, mongoConnection) =>
        err
          ? reject(err)
          : resolve({
              client: mongoConnection.db(config.dbName),
              closeConnectionFn: () =>
                setTimeout(() => {
                  mongoConnection.close;
                }, 1000),
              mongoConnection,
            })
    );
  });
