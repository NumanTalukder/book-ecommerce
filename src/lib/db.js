import mongoose from 'mongoose'

const connection = {}

async function connect() {
  if (connection.isConnected) {
    return
  }

  if (mongoose.connections[0].length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    if (connection.isConnected) {
      return
    }
    await mongoose.disconnect()
  }

  const db = await mongoose.connect(process.env.MONGO_URL)
  connection.isConnected = db.connections[0].readyState
}

const db = { connect }

export default db
