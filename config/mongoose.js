import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connect to Mongoose database using  ${conn.connection.host}`.bgBlue.white
    );
  } catch (error) {
    console.log(`Error connecting to Mongo ${error.message}`);
  }
};

export default connectDB;
