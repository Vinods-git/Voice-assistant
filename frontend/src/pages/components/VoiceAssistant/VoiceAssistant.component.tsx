import VoiceAssistantAvatar from "./VoiceAssistantAvatar/VoiceAssistantAvatar.component"
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder.component"
import styles from "@/styles/VoiceAssistant.module.css";
import {useState} from "react"
import useVoiceAssistant from "./useVoiceAssistant.hook";
import ReactLoading from "react-loading";
import Typewriter from 'typewriter-effect';
import AudioPlayer from "../AudioPlayer/AudioPlayer.component";
import { log } from "console";

const VoiceAssistant = ()=>{
    const {handleUserVoiceRecorded,setIsWaitingAIOutput,isWaitingAIOutput,lastAIReply,setLastAIReply,handleOnAudioPlayEnd} = useVoiceAssistant()
    const [promtStr,setPromtStr] = useState<string>("")
    
    const   submitHandler = async () =>{
      try {
      setIsWaitingAIOutput(true)
      let data;
        const response = await window.fetch("http://localhost:8000/voice-assistant/string-message", {
          // learn more about this API here: https://graphql-pokemon2.vercel.app/
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({
            query:promtStr
          }),
        }).then(data=>data.json()).then(res=> setLastAIReply(res))
        
        setIsWaitingAIOutput(false)
        

      } catch (error) {
        setLastAIReply("Error in fetch");
        setIsWaitingAIOutput(false)

      }

      
    }
    
    return (
        <div className={styles["voice-assistant-component"]}>
            <h1>Personal Voice Assistant</h1>
            <VoiceAssistantAvatar/>
            <VoiceRecorder onAudioRecordingComplete={handleUserVoiceRecorded}/>
            {isWaitingAIOutput ?
                // (<ReactLoading type={"bars"} color={"#4287f5"} width={200} />) :<>{lastAIReply}</>
                (<ReactLoading type={"bars"} color={"#4287f5"} width={200} />) :
                <>
                  <div>Not heard question properly? Type your question!</div>
                  <input className={styles["qtn"]} onChange = {(e)=> setPromtStr(e.target.value)} id="qtn"/><input type="button" className={styles["button"]} value="submit" onClick={submitHandler}/>
                  <div style={{background:"lightblue", padding:"4px"}}>
                      <Typewriter
                      onInit={(typewriter) => {
                      typewriter.typeString(lastAIReply?lastAIReply:"")
                        .changeDelay(1)
                        .start();
                        }}
                      />
                  </div>
                </>   
            }
            
            
            
        </div>
    )
}


export default VoiceAssistant
