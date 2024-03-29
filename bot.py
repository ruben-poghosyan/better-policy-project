from fastapi import Depends, FastAPI
import uvicorn
from oct2py import Oct2Py
from queue import Queue
from typing import Optional

# Create a queue to hold the Octave sessions
octave_sessions = Queue()

# Create 5 Octave sessions and put them in the queue
for _ in range(5):
    octave_session = Oct2Py()
    octave_sessions.put(octave_session)

def get_octave_session():
    # Get an Octave session from the queue
    octave_session = octave_sessions.get()
    return octave_session

def return_octave_session(octave_session: Optional[Oct2Py]):
    # Return the Octave session to the queue
    if octave_session is not None:
        octave_sessions.put(octave_session)

async def send_command_to_octave(command, octave_session: Oct2Py = Depends(get_octave_session)):
    # Run the command in the Octave session
    output = octave_session.eval(command)
    # Return the Octave session to the queue
    return_octave_session(octave_session)
    return output

app = FastAPI()

@app.get("/octave")
async def hello(octave_session: Oct2Py = Depends(get_octave_session)):
    # Send a command to the Octave session
    res = await send_command_to_octave("x = eig(rand(2000)); disp(x);", octave_session)
    return {"message": res}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)