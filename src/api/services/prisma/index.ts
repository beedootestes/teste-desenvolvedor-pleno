//All dependency imports
import { PrismaClient } from '@prisma/client';

//Creating the constant with the prism client
const prismaClient = new PrismaClient();

//Exporting the constant with the prism client
export default prismaClient;