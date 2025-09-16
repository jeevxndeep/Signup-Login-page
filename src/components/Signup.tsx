import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full h-full justify-center items-center flex ">
                <Button className="bg-blue-400 m-5" variant="contained" onClick={()=>navigate('/create')}>SignUp</Button>
                <Button variant="outlined" onClick={()=>navigate('/login')}>Login</Button>
            </div>
        </>
    )
};

export default SignUp;