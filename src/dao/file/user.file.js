let users = []

class UserDaoFile {
    constructor(){
        this.users = []
    }

    get = async () => this.users
    
    getById = async (uid) => this.users.find(user => uid === user.id)

    create = async (newUser) => this.users.push(newUser)
}

module.exports = UserDaoFile