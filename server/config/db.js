const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://robby_jn:robby_jnm0ng0@cluster0.uvk7c.mongodb.net/chat-now?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to ChatNow database");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = InitiateMongoServer;
