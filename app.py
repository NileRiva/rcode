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
            request = await websocket.receive_text() ####await timeout????
            print(request)
            s.send(bytes.fromhex(request))
            try:
                data = s.recv(5)
                if data[0] == 0xff and data[len(data) - 1] == 0xff:
                    buf=[]
                    for i in range(1, 4):
                        buf.append(data[i])
                    print(buf)
            except Exception as e:
                print('Socket Error:',e)
            
    except WebSocketDisconnect:
        print("Closed")
        s.close()
        

if __name__ == "__main__":
    uvicorn.run("app:app")
