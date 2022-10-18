import { helpers } from "@vuelidate/validators";

export const password = (value:string) => {
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$/;
    return regularExpression.test(value)
} 

export const equal = (param:string) => (value:string) => !helpers.req(value) && value === param;