import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// since scrypt is callback based and since we would like to use await we are converting this to promise based approach using promisify

const scryptAsync = promisify(scrypt);

export class PasswordManager {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex'); // this generates a random string
    // password hashing
    const buff = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buff.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    // password hashing
    const buff = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return hashedPassword === buff.toString('hex');
  }
}
