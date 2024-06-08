import { Platform } from "react-native-web";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const config ={
    endpoint: 'https://cloud.appwrite.io/v1',
    Platform : 'com.techzider.zeon',
    projectId: '66476e990007a5522816',
    databaseId: '66477cae0011a001b52b',
    userCollectionId: '66477d2f002e0aaeb681',
    videoCollectionId: '66477d67000c88c52cbd',
    storageId: '6647800500259fbae5af'
}

const {

    endpoint,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,

} = config;

// Init your React Native SDK
const client = new Client();
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);


client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.Platform) // Your application ID or bundle ID.
;

const account = new Account(client);

export const createUser = async(email,password, userName ) =>{
    try{
        console.log('creating')
        console.log(email)
        console.log(userName)
        console.log(password)

        const newAccount =await account.create(ID.unique(),email,password,userName)


        console.log('created')

        if(!newAccount) throw Error;
        const avtarUrl = avatars.getInitials(userName)

        await signIn(email , password )

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                userName,
                avatar:avtarUrl
            }
        )

        return newUser;

    }catch(error){
        console.log(error);
        throw new Error(error);

    }

}

export const signIn = async(email , password) =>{
    try{
        console.log('starting')
        const session = await account.createEmailPasswordSession(email,password)
        console.log("done")
        return session;

    }catch(error){
        throw new Error(error)
    }

}

export const getCurrentUser = async() =>{
    try {
      const currentAccount = await account.get();
      
      if(!currentAccount) throw Error;
      const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal('accountId' , currentAccount.$id)]
      )

      if(!currentUser) throw Error
      return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () =>{
  
    try {
     
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            // [Query.equal("creator", userId)]
            
        )

        return posts.documents;
        
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatstPosts = async () =>{
  
    try {
     
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt'  , Query.limit(7))]
            
        )


        return posts.documents;
        
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) =>{
  
    try {
     
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title'  , query)]
            
        )


        return posts.documents;
        
    } catch (error) {
        throw new Error(error);
    }
}


export const getUserPosts = async(userId) =>{
  
    try {
     
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator',userId)]
            
        )


        return posts.documents;
        
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async() =>{
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error) {
        throw new Error(error)
    }
}


export const getFilePreview = async(fileId , type) =>{
    let fileUrl;

    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(storageId,fileId)
        }else if(type === 'image'){
            fileUrl = storage.getFilePreview(storageId , fileId , 2000,2000 ,'top' , 100)
        }else{
            throw new Error('Invalid File Type')
        }

        if(!fileUrl) throw Error;

        return fileUrl;
        
    } catch (error) {
        throw new Error(error)
    }
}


export const uploadFile = async(file , type)=>{
    if(!file) return;
    const{mimeType , ...rest} = file;
    const asset = {type:mimeType , ...rest};

    try {
        const uploadedFile =await storage.createFile(
            storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
        
    } catch (error) {
        throw new Error(error)
        
    }

}

export const createVideo = async(form)=> {

    try {
        console.log('running')
        const[thumbnailUrl , videoUrl] = await Promise.all([
            uploadFile(form.thumbnail , 'image'),
            uploadFile(form.video , 'video'),
        ])

        const newPost = await databases.createDocument(
            databaseId , videoCollectionId , ID.unique(),{
                title : form.title,
                thumbnail : thumbnailUrl,
                video: videoUrl,
                prompt : form.prompt,
                creator: form.userId

            }
        )

        return newPost;

        
    } catch (error) {
        throw new Error(error);
        
    }

}

 
