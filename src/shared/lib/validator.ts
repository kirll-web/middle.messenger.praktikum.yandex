export class Validator {
    static nameRegex = /^(?:[A-ZА-Я][a-zа-я]+(?:-[A-ZА-Я][a-zа-я]+)*)$/;

    static minLength(value: string, length: number): boolean {
        return value.length > length;
    }

    static required(value?: string | null) {
        if (value === undefined || value === null) {
            return false;
        }

        return this.minLength(value, 0);
    }

    static validateName(name: string): boolean {
        return this.nameRegex.test(name);
    }

    // login
    static validateLogin(login: string): boolean {
        // От 3 до 20 символов, латиница, цифры допустимы, но не все цифры,
        // допускается "-" и "_", без пробелов
        const regex = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
        return regex.test(login);
    }

    // email
    static validateEmail(email: string): boolean {
        // Латиница, цифры, "-", "_", обязательно @, точка после,
        // перед точкой обязательно буквы
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
        return regex.test(email);
    }

    // password
    static validatePassword(password: string): boolean {
        // От 8 до 40 символов, хотя бы одна заглавная и одна цифра
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
        return regex.test(password);
    }

    static equalsPassword(firstPassword: string, secondPassword: string): boolean {
        return firstPassword === secondPassword;
    }

    // phone
    static validatePhone(phone: string): boolean {
        // От 10 до 15 символов, только цифры, может начинаться с +
        const regex = /^\+?\d{10,15}$/;
        return regex.test(phone);
    }
}
