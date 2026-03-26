import { ENV } from '../../playwright.config';
import { UserAccount } from '../../data/automation-exercises/types';

export const userData: UserAccount = {
    name: 'testname',
    email: ENV.registerEmail,
    password: ENV.registerPassword,
    title: 'Mr',
    birth_date: '1',
    birth_month: '1',
    birth_year: '1991',
    firstname: 'testfirstname',
    lastname: 'testlastname',
    company: 'company',
    address1: 'address 1',
    address2: 'address 2',
    country: 'Canada',
    zipcode: "12345",
    state: 'teststate',
    city: 'city',
    mobile_number: '4234234'
}