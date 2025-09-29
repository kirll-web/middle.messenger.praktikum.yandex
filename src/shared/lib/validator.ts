export class Validator {
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
        const regex = /^(?:[A-ZА-ЯЁ][a-zа-яё]+(?:-[A-ZА-ЯЁ][a-zа-яё]+)*)$/;
        return regex.test(name);
    }

    static validateLogin(login: string): boolean {
        //от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,
        // без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)
        const regex = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
        return regex.test(login);
    }

    static validateEmail(email: string): boolean {
        // Латиница, цифры, "-", "_", обязательно @, точка после,
        // перед точкой обязательно буквы
        const regex =
            /^(([^<>()[\]\\.,;:\s@*"]+(\.[^<>()[\]\\.,;:\s@*"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    static validatePassword(password: string): boolean {
        // От 8 до 40 символов, хотя бы одна заглавная и одна цифра
        const regex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
        return regex.test(password);
    }

    static equalsPassword(firstPassword: string, secondPassword: string): boolean {
        return firstPassword === secondPassword;
    }

    static validateMessage(value: string): boolean {
        return this.required(value);
    }

    static validatePhone(phone: string): boolean {
        // От 10 до 15 символов, только цифры, может начинаться с +
        const regex = /^\+?\d{10,15}$/;
        return regex.test(phone);
    }
}
