class UserDaoMemory {
    constructor(){
        this.user = []
    }

    get = async () => this.user
    
    getById = async (uid) => this.user.find(user => uid === user.id)

    create = async (newUser) => this.user.push(newUser)
}

module.exports = UserDaoMemory