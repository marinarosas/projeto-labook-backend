import { UsersDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase{

    public static TABLE_USERS = "users"
    public static TABLE_LIKESDISLIKES = "likes_dislikes"

    public async findUsers (q: string | undefined){

        let usersDB

        if (q) {
            const result = await BaseDatabase.connection(UsersDatabase.TABLE_USERS).where("content", "LIKE", `%${q}%`)
            usersDB = result
        } else {
            const result = await BaseDatabase.connection(UsersDatabase.TABLE_USERS)
            usersDB = result
        }

        return usersDB
    }

    public async findUserById(id: string | undefined): Promise <UsersDB | undefined>{
        const [userDBExist]: UsersDB[] | undefined[] = await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .where({id: id})
        return userDBExist
    }

    public async findUserByEmail(email: string | undefined): Promise <UsersDB | undefined>{
        const [emailUserDBExist]: UsersDB[] | undefined[] = await BaseDatabase
        .connection (UsersDatabase.TABLE_USERS)
        .where({email: email})
        return emailUserDBExist
    }

    public async insertUser(newUserDB: UsersDB): Promise <void>{
        await BaseDatabase.connection(UsersDatabase.TABLE_USERS).insert(newUserDB)

    }

    public async updateUserById(newUserDB: UsersDB): Promise <void>{
        await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .update(newUserDB)
        .where({id: newUserDB.id})
    }

    public async deleteUser(id: string){

        await BaseDatabase
        .connection(UsersDatabase.TABLE_LIKESDISLIKES)
        .del()
        .where({user_id:id})

        await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .del()
        .where({id})    
    }

    public async checkUser (email: string, password: string){
        if(email){
          const userDB: UsersDB[] =  await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .where({email: email, password: password})

        return userDB

        }
    }
}