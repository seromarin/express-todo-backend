import mongoose, { mongo } from 'mongoose';

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@todo-cluster-xmwwh.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

export const mongooseConnection = mongoose.connection;
