from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import scipy.sparse as sp
import numpy.linalg as LA
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
app = FastAPI(title="homepage")
api_app = FastAPI(title="api")
def hpfilter(y, lamb):
        m = len(y)
        d = np.tile(np.array([lamb, -4*lamb ,((6*lamb+1)/2)]),(m,1))
        d[0,1] = -2*lamb
        d[0,2] = (1+lamb)/2
        d[1,2] = (5*lamb+1)/2
        d[m-2,1]=-2*lamb
        d[m-1,2]=(1+lamb)/2
        d[m-2,2]=(5*lamb+1)/2
        B = np.array(sp.spdiags(np.transpose(d), [-2,-1,0], m, m).todense())
        B = B+np.transpose(B)
        trend = [[]]
        trend = np.matmul(LA.inv(B),y)
        trend = np.transpose(trend)
        trend = trend.round(1)
        return trend.tolist()
api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    series: list
    l: int=1400

app.mount("/api", api_app)
app.mount("/", StaticFiles(directory="static",html = True), name="static")


@api_app.post("/hpfilter")
async def filter(item: Item):
    result = hpfilter(item.series, item.l)
    return {"trend":result}


