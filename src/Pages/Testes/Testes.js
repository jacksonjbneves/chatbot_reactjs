import { useRef, useState, useEffect } from "react";

export default function Testes() {    

    return (
      <h1>Teste</h1>
    );
}

/* useState  */
export function Contador() {
    const [contador, setContador] = useState(0); // estado inicial = 0
  
    return (
      <div>
        <p>Você clicou {contador} vezes</p>
        <button onClick={() => setContador(contador + 1)}>Clique aqui</button>
      </div>
    );
}

/* useRef  */
export function FocoInput() {
    const inputRef = useRef(null);
  
    function focarInput() {
      inputRef.current.focus(); // acessando diretamente o DOM
    }
  
    return (
      <div>
        <input ref={inputRef} type="text" placeholder="Digite algo" />
        <button onClick={focarInput}>Focar no input</button>
      </div>
    );
}

/* useRef  */
export function Exemplo() {
    const [contador, setContador] = useState(0);
    const ref = useRef(0);
  
    function incrementar() {
      setContador(contador + 1); // causa re-render
      ref.current += 1;          // NÃO causa re-render
      //console.log("Valor no ref:", ref.current);
      console.log("Valor no ref:", contador);
    }
  
    return (
      <div>
        <p>Estado contador: {contador}</p>
        <button onClick={incrementar}>+1</button>
      </div>
    );
}

/* useEffect */
export function Relogio() {
    const [segundos, setSegundos] = useState(0);
    let tempo = 0;
  
    useEffect(() => {
      const timer = setInterval(() => setSegundos(segundos => segundos + 1), 1000);
  
      return () => clearInterval(timer); // cleanup
    
    }, []); 

    return (         
         <h2>Tempo: {segundos}s</h2>  
        );
}
  