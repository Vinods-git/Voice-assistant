import VoiceAssistantAvatar from "./VoiceAssistantAvatar/VoiceAssistantAvatar.component"
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder.component"
import styles from "@/styles/VoiceAssistant.module.css";
import useVoiceAssistant from "./useVoiceAssistant.hook";
import ReactLoading from "react-loading";
import Typewriter from 'typewriter-effect';
import AudioPlayer from "../AudioPlayer/AudioPlayer.component";

const VoiceAssistant = ()=>{
    const {handleUserVoiceRecorded,isWaitingAIOutput,lastAIReply,handleOnAudioPlayEnd} = useVoiceAssistant()
    return (
        <div className={styles["voice-assistant-component"]}>
            <VoiceAssistantAvatar/>
            <VoiceRecorder onAudioRecordingComplete={handleUserVoiceRecorded}/>
            <div style={{background:"lightblue"}}>
            {isWaitingAIOutput ?
                // (<ReactLoading type={"bars"} color={"#4287f5"} width={200} />) :<>{lastAIReply}</>
                (<ReactLoading type={"bars"} color={"#4287f5"} width={200} />) :<Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString(lastAIReply?lastAIReply:"")
                    .changeDelay(1)
                    .start();
                }}
              />
            }
            </div>
        </div>
    )
}


export default VoiceAssistant