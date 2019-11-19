let users;
class UserDAO {
  async injectDB(conn) {
    try {
      users = await conn.db('algoliaSearch').collection("users")
      } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

 async addUser(userInfo) {
    try {
     const data= await users.insertOne(userInfo)
      return { success: true ,data:data.ops}
    } catch (e) {
      if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
        return { error: "A user with the given email already exists." }
      }
      console.error(`Error occurred while adding new user, ${e}.`)
      return { error: e }
    }
  }


 async getEmail(email) {
    try {
     const resp= await users.find({email:email})
      return  await resp.toArray() 
    } catch (e) {
      if (String(e).startsWith("MongoError: E11000 duplicate key error")) {
        return { error: "A user with the given email already exists." }
      }
      console.error(`Error occurred while adding new user, ${e}.`)
      return { error: e }
    }
  }
}

module.exports = new UserDAO();