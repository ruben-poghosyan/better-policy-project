import numpy as np
import scipy.sparse as sp
import numpy.linalg as LA
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

def moving_average(arr, window_size):
    i = 0
    # Initialize an empty list to store moving averages
    moving_averages = []
    
    # Loop through the array t o
    #consider every window of size 3
    while i < len(arr) - window_size + 1:
    
        # Calculate the average of current window
        window_average = round(np.sum(arr[
        i:i+window_size]) / window_size, 2)
        
        # Store the average of current
        # window in moving average list
        moving_averages.append(window_average)
        
        # Shift window to right by one position
        i += 1
    return moving_averages