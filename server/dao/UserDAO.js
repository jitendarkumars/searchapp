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
      console.error(`Error occurred while adding new user, ${e}.`)
      return { error: e }
    }
  }


 async getEmail(email) {
    try {
     const resp= await users.find({email:email})
      return  await resp.toArray() 
    } catch (e) {
      console.error(`Error occurred while adding new user, ${e}.`)
      return { error: e }
    }
  }

  async getUserDetails(userNameOrMail,password) {
    try {
     const resp= await users.find({
      $and:[{ $or:[{userName:userNameOrMail},{email:userNameOrMail}] },{password:password}]
    })
      return  await resp.toArray() 
    } catch (e) {
      console.error(`Error occurred while adding new user, ${e}.`)
      return { error: e }
    }
  }
  
}

module.exports = new UserDAO();