import uvicorn
from fastapi import FastAPI, WebSocket,WebSocketDisconnect
app = FastAPI()

# echo-client.py

import socket

HOST = "127.0.0.1"  # The server's hostname or IP address
PORT = 2001  # The port used by the server


@app.websocket("/gobot")
async def test(websocket: WebSocket):
    await websocket.accept()
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((HOST, PORT))
    try: 
        while True:
            request = await websocket.receive_text()
            print(request)
            s.send(bytes.fromhex(request))
            #data = s.recv(1024)
    except WebSocketDisconnect:
        print("Closed")
        s.close()
        

if __name__ == "__main__":
    uvicorn.run("app:app")