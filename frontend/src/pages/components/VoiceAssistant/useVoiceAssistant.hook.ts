import getAIReplyOutput  from "@/pages/services/aivoiceassistant.service"
import {useState} from "react"


const useVoiceAssistant = ()=>{
    const [isWaitingAIOutput,setIsWaitingAIOutput] = useState<boolean>(false)
<<<<<<< HEAD
=======
    const [lastAIReplyURL,setLastAIReplyURL] = useState<string|undefined>(undefined)
>>>>>>> 19009f5 (changes made)
    const [lastAIReply,setLastAIReply] = useState<string|undefined>(undefined)

    const handleUserVoiceRecorded = async(userAudioData:Blob)=>{
        setIsWaitingAIOutput(true)
        const result = await getAIReplyOutput(userAudioData)        
        setLastAIReply(result)
        setIsWaitingAIOutput(false)
<<<<<<< HEAD
        if(result){
            const url = URL.createObjectURL(result)
            setLastAIReply(url)
        }
=======
        // if(result){
        //     const url = URL.createObjectURL(result)
        //     setLastAIReplyURL(url)
        // }
>>>>>>> 19009f5 (changes made)

    }

    const handleOnAudioPlayEnd = ()=>{
<<<<<<< HEAD
        setLastAIReply(undefined)
=======
        setLastAIReplyURL(undefined)
    }
    return{
        handleUserVoiceRecorded,
        isWaitingAIOutput,
        setIsWaitingAIOutput,
        setLastAIReply,
        // lastAIReplyURL,
        lastAIReply,
        handleOnAudioPlayEnd
>>>>>>> 19009f5 (changes made)
    }
    return{handleUserVoiceRecorded,setIsWaitingAIOutput,isWaitingAIOutput,lastAIReply,setLastAIReply} 
}


export default useVoiceAssistant