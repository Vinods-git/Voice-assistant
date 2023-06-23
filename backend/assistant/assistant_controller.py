from fastapi import APIRouter, UploadFile
import time
from fastapi.responses import FileResponse
from assistant.assistant_service import handle_audio_from_user
from chat.chat_service import handle_get_response_for_user
from pydantic import BaseModel

controller = APIRouter(prefix='/voice-assistant')
class Item(BaseModel):
   query : str
@controller.post('/audio-message', status_code=200)
async def handle_receive_audio_data(file: UploadFile):
    print('file_data >> ', file)
    file_data = await file.read()
    return await handle_audio_from_user(file_data)

@controller.post('/string-message', status_code=200)
def handle_receive_string_data(item:Item):
    print('file_data >> ', item.query)
    # time.sleep(5)
    return handle_get_response_for_user(str(item.query))
    # return "Hi my name is Vinod \n I am a Singer vinod@vinod-VivoBook-15-ASUS-Laptop-X507UAR:~/Desktop/Git/ai-voice-assistant-main/backend$ . /home/vinod/.cache/pypoetry/virtualenvs/code-Pq_GqC3v"