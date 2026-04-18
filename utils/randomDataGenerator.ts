import faker from 'faker';
import { DateTime } from 'luxon';

export class RandomDataUtil {

  static getFirstName(): string {
    return faker.name.firstName();
  }

  static getLastName(): string {
    return faker.name.lastName();
  }

  static getFullName(): string {
    return faker.name.findName();
  }

  static getEmail(): string {
    return faker.internet.email();
  }

  static getPhoneNumber(): string {
    return '9' + Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  static getPassword(): string {
    return faker.internet.password(8);
  }

  static getOccupation(): string {
    const options = ['Doctor', 'Engineer', 'Student'];
    return options[Math.floor(Math.random() * options.length)];
  }

  static getGender(): string {
    const options = ['Male', 'Female'];
    return options[Math.floor(Math.random() * options.length)];
  }

  static getBoolean(): boolean {
    return Math.random() > 0.5;
  }

  static getPrice(): number {
    return faker.datatype.number({ min: 100, max: 5000 })
  }

  static getDepositPaid(): boolean {
    return faker.datatype.boolean()
  }

  static getCheckinDate(format: string): string {
    return DateTime.now().toFormat(format)
  }

  static getCheckoutDate(format: string, addDays: number): string {
    return DateTime.now().plus({ day: addDays }).toFormat(format)
  }
}