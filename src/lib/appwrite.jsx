import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66e956f4001e45b2a9aa');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client); // Add this line to initialize storage
export { ID } from 'appwrite';
