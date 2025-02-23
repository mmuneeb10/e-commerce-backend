import * as bcrypt from 'bcryptjs';

export class Crypt {
  static saltRounds = 10;

  static async hashString(input: string): Promise<string> {
    return await bcrypt.hashSync(input, this.saltRounds);
  }

  static async compare(plainString: string, hash?: string): Promise<boolean> {
    if (!hash) return false;
    return await bcrypt.compareSync(plainString, hash);
  }
}
