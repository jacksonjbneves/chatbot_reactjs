import { useNavigate } from "react-router-dom";
import  './Home.css';

export default function Home(){
    const navigate = useNavigate();

    const handleClick = () => {        
        navigate("/chat");
    }

    return (
        <div className="container-fluid border d-flex justify-content-center align-items-center vh-100">
            <div className="container shadow p-3 w-25 border roudend rounded-3 d-flex flex-column justify-content-center align-items-center" >                 
                <dotlottie-wc src="/image/lottie/LittlePowerRobot.lottie" speed="1" style={{ width:"300px", height:"300px" }} mode="forward" loop autoplay></dotlottie-wc>                
                <button type="button" className="btn btn-outline-dark" onClick={handleClick}>Vamos Conversar?</button>
            </div>
        </div>        
    );
}