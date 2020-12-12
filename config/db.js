const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const mongoConn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(
      `Connected to mongoDB database at ${mongoConn.connection.host}`
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectMongoDB;
