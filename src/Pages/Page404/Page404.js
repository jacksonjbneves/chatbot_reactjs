export default function Page404(){
    return (
        <div className="container-fluid border d-flex justify-content-center align-items-center vh-100">
            <div className="container shadow p-3 w-50 border roudend rounded-3 d-flex flex-column justify-content-center align-items-center" >                
                <dotlottie-wc src="/image/lottie/Lonely404.lottie" speed="1" style={{ width:"300px", height:"300px" }} mode="forward" loop autoplay></dotlottie-wc>                
                <h2>Página Não Encontrada</h2>
                <p>A página que você está procurando não existe.</p>
            </div>
        </div>
    );  
}