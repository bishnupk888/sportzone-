import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance/axiosInstance'

const useFetchData = () => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    useEffect(()=>{
       const fetchData = async()=>{
            try {
                const res = await axiosInstance.get(url)

                const result = await res.json()
                if(!res.ok){
                    throw new Error("error..." ,result.message )
                }
                setData(result.data)
                setLoading(false)
            } catch (err) {
                setLoading(false)
                setError(err.message)
            }
       }
    },[url])
  return {
    data,
    loading,
    error
  }
}

export default useFetchData