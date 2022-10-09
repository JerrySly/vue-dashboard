import { getUser } from "../database/users";
import { getUserSettings } from "../database/usersSettings";
import { comparePassword, hashPassword } from "../helper/hash";
import { AppError, User, UserSettings } from "../models";

export const createUser = async (login:string, password:string): Promise<User | AppError> => {
  const hashedPassword = await hashPassword(password);
  if (await isExist(login)) {
    return {
      message: "User with this username already exists",
    };
  }
  const user = await createUser(login, hashedPassword);
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
    if(isPasswordsEqual)
        return user;
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

