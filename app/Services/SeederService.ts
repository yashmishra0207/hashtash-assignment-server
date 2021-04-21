import Database from "@ioc:Adonis/Lucid/Database";

class SeederService {
  static getInstance() {
    return new SeederService();
  }

  async removeOldData() {
    await Database.rawQuery('DELETE FROM followers');
    await Database.rawQuery('ALTER TABLE followers AUTO_INCREMENT= ? ;', [1]);

    await Database.rawQuery('DELETE FROM tweets');
    await Database.rawQuery('ALTER TABLE tweets AUTO_INCREMENT= ? ;', [1]);

    await Database.rawQuery('DELETE FROM users');
    await Database.rawQuery('ALTER TABLE users AUTO_INCREMENT= ? ;', [1]);

    //NOTE: Add queries at the top of function
  }
}

export const seederService = SeederService.getInstance();