"use strict";

class UserStorage{
    static #users = {
        id : ["jakekang28", "asdf", "asdf2"],
        psword : ["kjh0628", "1234", "123456"],
    };

    static getUsers(...fields){
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        } , {});
        return newUsers;
    }
}

module.exports = UserStorage;