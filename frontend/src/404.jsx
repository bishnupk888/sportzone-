import { useNavigate } from "react-router-dom"


const PageNotFound =()=>{
    const navigate = useNavigate() 
    const handleClick =()=>{
        navigate('/home')
    }
return (
    <div className="bg-black absolute h-screen w-screen top-0 b-0 flex flex-col justify-center items-center space-y-4">
     <h1 className="text-redBorder text-8xl ">404!</h1>   
    <h1 className="text-white text-4xl">Page Not Found </h1>
    <button className="text-textColor bg-buttonBgColor border border-redBorder px-4 py-2 rounded-[8px] hover:scale-105" onClick={handleClick }>back to home</button>


    </div>
)
}
export default PageNotFound