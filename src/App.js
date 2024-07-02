import { useState } from "react";
function App() {
  const [error, setError]= useState("")
  const [value, setValue] = useState("")
  const [chatHistory, setChatHistory] = useState([]);
  const supriseOptions = [
    'Who is the Prime Minister of India?',
    'Where does Madhubani Painting came from?',
    'When did India won their first t20 cricket world cup?',
    'Hottest place on Earth?',
    'Value of 10 factorial?'
  ]
  const suprise= () => {
    const randomValue = supriseOptions[Math.floor(Math.random()*supriseOptions.length)]
    setValue(randomValue);
  }
  const getResponse = async () => {
    if(!value){
      setError("Error! Please ask a question")
      return;
    }
    try{
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('https://backend-chatbot-2.onrender.com/gemini',options);
      const data = await response.text();
      console.log(data)
      setChatHistory(oldchatHistory => [...oldchatHistory, {
        role:"user",
        parts: [{ text: value }]
      },
      {
        role:"model",
        parts: [{ text: data }]
      }
    ])
    setValue("")
    } catch(error){
      console.error(error)
      setError("Something went wrong please try again later")
    }
  }
  const clear = () =>{
    setValue("");
    setError("");
    setChatHistory([])

  }
  return (
      <div className="app">
        <Navbarnew></Navbarnew>
        <Introduction></Introduction>
        <p>
          <b>Ask me any Question</b>
          <button className="suprise" onClick={suprise} disabled={!chatHistory}>Suprise Me</button>
        </p>
        <div className="input-container">
          <input value={value} placeholder="When is Christmas" onChange={(e) => setValue(e.target.value)}></input>
          {!error && <button onClick={getResponse}>ASK ME</button>}
          {error &&<button onClick={clear}>CLEAR</button>}
        </div>
        {error && <p>{error}</p>}
        <div className="search-result">
          {chatHistory.slice().reverse().map((chatItem, _index)=> <div key={_index}>
            <p className= "answer">{ chatItem.role } : { <pre style={{Width:"1000px"}}>{chatItem.parts[0].text}</pre> }</p>
          </div>)}
        </div>

      </div>
  );
}
function Introduction(){
  return (
    <div className="intro">
        <img src="https://images.pexels.com/photos/18069239/pexels-photo-18069239/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-how-ai-powered-tools-can-support-us-and-save-time-it-was-created-by-martina-stiftinger-as-part-of-the-visua.png?auto=compress&cs=tinysrgb&w=600" alt="Rohit Raj" className="profile-photo" />
        <h1>Rohit Raj</h1>
        <h3>About</h3>
        <p>
          Hi, I am Rohit Raj, a graduate of IIT Kharagpur with expertise in software development. I have interned at Honeywell Technology Solutions and have a strong command of the MERN stack and TypeScript. I have participated in hackathons, winning first place for a movie recommender system GUI, and I have extensive experience with both SQL and NoSQL databases. I love playing cricket and listening music.
        </p>
    </div>
  )
}
function Navbarnew(){
  return (
    <nav className="nav">
      <a href="/" className="site-title">
      Ro.Gemini
      </a>
      <ul>
        <li className="active">
          <a href="https://www.linkedin.com/in/rohit-raj-6b6362226">LinkedIn</a>
        </li>
        <li>
          <a href="https://github.com/rohitzraj">Github</a>
        </li>
      </ul>
    </nav>


  )
}
export default App;