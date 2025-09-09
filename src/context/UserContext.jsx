
import { createContext, useEffect, useState } from 'react'
import axios from "axios"

export const UserDataContext = createContext()

function UserContext({children}) {

const serverUrl = "https://virtualassistant-backend-five.vercel.app"


const [userData, setUserData]= useState(null)
 const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage , setSelectedImage] = useState(null)


 const handleCurrentUser = async()=>{
    try {
       let result = await axios.get(`${serverUrl}/api/user/currentuser`, { withCredentials: true });
        console.log("Current user:", result.data); 

setUserData(result.data)
console.log(result.data)
    } catch (error) {
        console.log(error)
        
    }
}

const getGeminiResponse = async (command) => {
  try {
    if (!command || command.trim() === "") {
      throw new Error("Command is required");
    }

    const result = await axios.post(
      `${serverUrl}/api/user/asktoassistant`,
      { command },
      { withCredentials: true }
    );

    console.log("Gemini Response:", result.data);
    return result.data;

  } catch (error) {
    if (error.response) {
      // Server responded with error status
      console.error("Server Error:", error.response.data);
      return { error: error.response.data.message || "Server error occurred" };
    } else if (error.request) {
      // Request was made but no response
      console.error("Network Error: No response from server");
      return { error: "No response from server" };
    } else {
      // Something else happened
      console.error("Error:", error.message);
      return { error: error.message };
    }
  }
};

useEffect(()=>{
    handleCurrentUser()
},[])

let value ={
serverUrl , userData, setUserData,backendImage, setBackendImage,frontendImage, setFrontendImage, selectedImage , setSelectedImage , getGeminiResponse
}



  return (
    <div>
      <UserDataContext.Provider value={value}>
            {children}
            </UserDataContext.Provider>
    </div>
  )
}

export default UserContext;
