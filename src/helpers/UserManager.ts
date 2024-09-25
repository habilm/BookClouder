export type UserData = {
    token: string;
    userName: string;
    avatarUrl: string;
}
export async function getCurrentUser():Promise<UserData|undefined>;
export async function getCurrentUser(key: string):Promise<string|undefined>;
export async function getCurrentUser( key?: string ):Promise<UserData|string|undefined>{
    const user = await chrome.storage.local.get("currentUser") ;

    if(!user.currentUser ) return undefined
    if(key){
        return user.currentUser[key as keyof UserData];
    }
    return user.currentUser as UserData;
}

export async function saveCurrentUser(userData: UserData): Promise<boolean>{
    try{
        await chrome.storage.local.set({ currentUser: userData });
        return true;
    }catch(e){
        console.error("Error saving current user", e);
        return false;
    }
    
}

export default class UserManager{
    storageKey = "currentUser"
    async  get( key?: string ):Promise<UserData|string|undefined>{
        const user = await chrome.storage.local.get(this.storageKey) ;
    
        if(!user[this.storageKey] ) return undefined
        if(key){
            return user[this.storageKey][key as keyof UserData];
        }
        return user[this.storageKey] as UserData;
    }

    async  save(userData: UserData): Promise<boolean>{
        try{
            await chrome.storage.local.set({ [this.storageKey]: userData });
            return true;
        }catch(e){
            console.error("Error saving current user", e);
            return false;
        }
        
    }

    async clear(){

        await chrome.storage.local.remove(this.storageKey)
    }
}

