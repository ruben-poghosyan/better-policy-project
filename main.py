from fastapi import FastAPI, Depends, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from ext import getavailablecountries,getavailableseries, get_time_series
from filters import hpfilter, moving_average
from oct2py import Oct2Py
import uvicorn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TimeSeriesData(BaseModel):
    series: list
    options: dict = {}

app.mount("/api", app)


octave_sessions = {}

def get_octave_session(request: Request):
    # Get the user's IP
    user_ip = request.client.host

    # If the user doesn't have a session yet, create one
    if user_ip not in octave_sessions:
        octave_session = Oct2Py()
        octave_session.logger.disabled = True
        octave_sessions[user_ip] = octave_session

    # Return the user's session
    return octave_sessions[user_ip]



def send_command_to_octave(command, octave_session: Oct2Py = Depends(get_octave_session)):
    # Run the command in the Octave session
    output = octave_session.eval(command, verbose=False)
    return output

@app.get("/octave")
def octave(command: str, octave_session: Oct2Py = Depends(get_octave_session)):
    # Send a command to the Octave session
    res = send_command_to_octave(command, octave_session)
    return {"message": str(res), "session": hash(octave_session)}






@app.get("/test")
def test():
     return {"result": "execution speed test"}

@app.get("/getcountries")
async def get_countries_endpoint():
     result = getavailablecountries()
     return result

@app.get("/getseriesmeta")
async def get_series_meta_endpoint(cat_id: int):
     result = getavailableseries(cat_id)
     return result

@app.get("/getseries")
async def get_series_endpoint(ser_id:str):
     result = get_time_series(ser_id)
     return result

@app.post("/hpfilter")
async def hp_filter_endpoint(requestBody: TimeSeriesData):
    result = hpfilter(requestBody.series, int(requestBody.options['l']))
    return {"result":result}


@app.post('/moving_average')
async def moving_average_endpoint(requestBody: TimeSeriesData):
     result = moving_average(requestBody.series, int(requestBody.options['window_size']))
     return {"result": result}

if __name__ == "__main__":
     uvicorn.run(app, host="localhost", port=8000)