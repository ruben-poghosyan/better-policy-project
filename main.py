from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from ext import getavailablecountries,getavailableseries, get_time_series
from filters import hpfilter, moving_average
app = FastAPI(title="homepage")
api_app = FastAPI(title="api")

api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TimeSeriesData(BaseModel):
    series: list
    options: dict = {}

app.mount("/api", api_app)
app.mount("/", StaticFiles(directory="static",html = True), name="static")




@api_app.get("/getcountries")
async def get_countries_endpoint():
     result = getavailablecountries()
     return result

@api_app.get("/getseriesmeta")
async def get_series_meta_endpoint(cat_id: int):
     result = getavailableseries(cat_id)
     return result

@api_app.get("/getseries")
async def get_series_endpoint(ser_id:str):
     result = get_time_series(ser_id)
     return result

@api_app.post("/hpfilter")
async def hp_filter_endpoint(requestBody: TimeSeriesData):
    result = hpfilter(requestBody.series, int(requestBody.options['l']))
    return {"result":result}


@api_app.post('/moving_average')
async def moving_average_endpoint(requestBody: TimeSeriesData):
     result = moving_average(requestBody.series, int(requestBody.options['window_size']))
     return {"result": result}