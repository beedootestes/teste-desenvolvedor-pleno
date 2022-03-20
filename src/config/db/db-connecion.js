import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export async function  connect() {
    
  const conexao = process.env.DB_MONGODB_CONEXAO;

  await mongoose.connect(conexao,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  });
} 

connect().catch((err) => console.error(err))

export default mongoose