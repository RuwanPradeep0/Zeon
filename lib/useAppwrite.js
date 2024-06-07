const { useEffect } = require("react")
const { useState } = require("react")

const useAppwrite =(fn) =>{

    
    
  const [data, setData] = useState([])
  const [isloading, setIsLoading] = useState(true)

  const fetchData = async () =>{
      setIsLoading(true);
      
      try {
          const response = await fn();
          setData(response)
          
        } catch (error) {
            Alert.alert('Error' , error.message)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() =>{

    fetchData()

    // console.log('data' , data)
  },[])

  const refetch = () => fetchData();


 return{data , isloading, refetch}
}

export default useAppwrite;