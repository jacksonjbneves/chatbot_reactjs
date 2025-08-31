import { useState, useRef, useEffect } from "react";
import api from "../../Config/API";
import { getToken } from "../../Utils/Auth";
import './Chat.css';

export default function Chat() {
  const [pergunta, setPergunta] = useState("");
  const [respostas, setRespostas] = useState([]);
  const [loading, setLoading] = useState(false); // novo estado
  const [sendQuest, setSendQuest] = useState(false); // novo estado  
  const chatEndRef = useRef(null); // referência para o final do chat
   
  const sendQuestion = async () => {
    if (!pergunta) return;

    setRespostas([...respostas, { pergunta, resposta: null, loading: true }]);
    setSendQuest(true);
    setPergunta("");
    console.log("loading ativo")
    try {      
      const res = await api.post("/questchatbot/pergunta", { pergunta }, {
      headers: { Authorization: `Bearer ${getToken()}` }
      });  

      const respostaFinal = res.data.resposta || "Não sei lhe responder";

      setTimeout(() => {
        setRespostas(prev => prev.map((r, i) => 
          i === prev.length - 1 ? { ...r, resposta: respostaFinal, loading: false } : r
        ));
        setSendQuest(false);
      }, 900);
      
    } catch (err) {      
      setRespostas(prev => prev.map((r, i) => 
        i === prev.length - 1 ? { ...r, resposta: "Erro ao responder", loading: false } : r
      ));
      setSendQuest(false);
    }
  };

  const restartChat = () => {
    setRespostas([]);
    setPergunta("");
  };

  // scroll automático para o final do chat quando respostas mudam
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [respostas, loading]);

  function loadAnimat(){
    return (
            <div className="m-0 d-flex flex-column xborder xborder-danger" style={{height:"auto"}} >
              <div className="me-auto d-flex align-items-center gap-2">
                <div className="spinner-border text-secondary" role="status" style={{ width: "1rem", height: "1rem" }}></div>                    
                <span>Carregando...</span>
              </div>
            </div>
           );
  }

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-content-center vh-100">
        <div className="container container-chat p-5 rounded-4 shadow xh-75">
          <div className="container mb-4 d-flex flex-row justify-content-center align-items-center">
            <dotlottie-wc src="/image/lottie/LittlePowerRobot.lottie" speed="1" style={{ width:"80px", height:"80px" }} mode="forward" loop autoplay></dotlottie-wc>
            {/* <h2 className="mb-4 text-center">ChatBot</h2> */}
            <div className="container p-0 m-0 d-flex " style={{ width:"120px", height:"44px" }}>
              <h2 className="mb-4 text-center">ChatBot</h2>
            </div>
          </div>  
    
          <div className="card mb-3">
            <div
              className="card-body"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {respostas.length === 0 && (
                <p className="text-muted">Nenhuma conversa iniciada...</p>
              )}
              {respostas.map((r, i) => (
                 <div key={i} className="chat-message mb-2 d-flex xborder xborder-danger">
                   {/* Balão pergunta - direita */}
                   <div className="message-bubble-user message-user ms-auto xborder xborder-danger ">
                     Você : {r.pergunta}
                   </div>
                   <div className="message-tip-user message-user xkloms-auto"></div>
                   {/* Balão resposta - esquerda */}
                   <div className="message-bubble-chat message-bot me-auto">                     
                     {r.loading ? loadAnimat() : `ChatBot : ${r.resposta}`}
                     {/* {r.loading ? "" : `ChatBot : ${r.resposta}`} */}
                   </div>
                   <div className="message-tip-chat message-bot me-auto"></div>
                 </div>
               ))}

              {/* referência para o final do chat */}
              <div ref={chatEndRef}></div>
            </div>
          </div>
    
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Digite sua pergunta..."
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
            />
            <button className="btn btn-success" onClick={sendQuestion} disabled={sendQuest}>
              <i className="bi bi-send "></i>
            </button>            
          </div>
    
          <button className="btn btn-warning w-100 mb-3" onClick={restartChat}>
            Encerrar Conversa
          </button>
          <button className="btn btn-danger w-100 mb-3" onClick={restartChat}>
            Reiniciar
          </button>

          {/* <div className="chat-message mb-2 d-flex flex-column">
            <div className="message-bubble-chat message-bot me-auto d-flex align-items-center gap-2">
              <div className="spinner-border text-secondary" role="status" style={{ width: "1rem", height: "1rem" }}>
                <span className="visually-hidden">Carregando...</span>
              </div>
              <span>Digitando...</span>
            </div>
            <div className="message-tip-chat message-bot me-auto"></div>
          </div> */}

        </div>
    </div>
  );
}