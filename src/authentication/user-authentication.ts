import { Database, CountParams } from '../database';

class UserAuthentication {
  static async authenticateUser(
    username: string,
    password: string,
  ): Promise<number> {
    try {
      const countParams: CountParams = {
        query: { username, password },
        options: {},
        collection: 'userData',
      };
      const db = new Database();
      const count = await db.countDocuments(countParams);
      return count;
    } catch (e) {
      throw e;
    }
  }
}

export { UserAuthentication };
