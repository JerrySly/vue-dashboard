import { createUserInDb, getUser } from "../database/users";
import { getUserSettings } from "../database/usersSettings";
import { comparePassword, hashPassword } from "../helper/hash";
import { AppError, User, UserSettings } from "../models";

export const createUser = async (login:string, password:string,name: string): Promise<User | AppError> => {
  console.log('Create', login)
  const hashedPassword = await hashPassword(password);
  console.log('Hashed: ',hashedPassword)
  if (await isExist(login)) {
    return {
      message: "User with this username already exists",
    };
  }
  const user = await createUserInDb(login, hashedPassword,name);
  return user;
};

const isExist = async (login:string):Promise<boolean> => {
    const user = await getUser(login)
    return user != null;
};

export const loginToAccount = async (login:string,password:string):Promise<User|AppError> =>{
    const user = await getUser(login);
    if(!user)
        return {
            message: "Error in login or password" 
        }
    const isPasswordsEqual = await comparePassword(password,user.password);
    if(isPasswordsEqual){
        saveUser(user);
        return user;
    }
    return {
        message: "Error in login or password" 
    }
}

export const getSettings =async (userId:string):Promise<UserSettings | AppError> => {
  const settings = await getUserSettings(userId);
  if(!settings)
    return {
      message: "Settings not found"
    }
  return settings;
}
export const logOut = () => {
  localStorage.removeItem('user');
}

const saveUser = (user:User) => {
  localStorage.setItem('user', JSON.stringify(user));
}

