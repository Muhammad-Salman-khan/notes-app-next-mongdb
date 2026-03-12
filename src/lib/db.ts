import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
let isConnected = false;
export default async function dbConnent() {
  if (isConnected) {
    console.log(`Mongodb is already connected`);
    return;
  }
  try {
    const db = await mongoose.connect(`${MONGODB_URI}`);
    isConnected = db.connections[0].readyState === 1;
    console.log(`db is connented`, db.connection.host);
  } catch (error: any) {
    console.error(`failed to connect db`, error);
  }
}
