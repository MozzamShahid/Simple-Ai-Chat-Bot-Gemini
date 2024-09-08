import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('66d832a9001deb659a9e'); // Your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client); // Add this line to initialize storage
export { ID } from 'appwrite';
