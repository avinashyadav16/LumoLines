
import config from '../config/config'
import { Client, Account, ID } from 'appwrite'



/* AUTHORISATION CLASS */
export class AuthService {
    client = new Client();
    account;


    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }



    /* CREATING ACCOUNT */
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.createAccount(ID.unique, email, password, name);
            if (userAccount) {
                return this.login({ email, password });

            }
            else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite Service :: createAccount :: Error", error);
        }
    }



    /* LOGIN */
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite Service :: login :: Error", error);
        }
    }



    /* GETTING CURRENT USER'S VISTING PAGE */
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: Error", error);
        }
        return null;
    }



    /* LOGOUT */
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: logout :: Error", error);
        }
    }





}



/* AUTHORISATION CLASS OBJECTS: */
const authService = new AuthService();
export default authService;