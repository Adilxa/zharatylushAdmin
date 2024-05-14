import { useState } from "react";
import $api from "../http/Api";

const useUsers = () => {

    const [userData , setData] = useState(null)
    const [isLoading , setLoading] = useState(false)

 
    const getUsers = async() => {
        setLoading(true)
        try{
            const res = await $api.get("user/get")

            setData(res.data)
        
            setLoading(false)
        }catch(e){
            console.log(e);
            setLoading(false)
        }
    }

    return {
        userData,
        isLoading,
        getUsers
    }
}

export  default useUsers;