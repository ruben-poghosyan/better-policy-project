from full_fred.fred import Fred
fred = Fred(api_key_file='fred_key')
cache_categories = {}
def getavailablecountries():
    # 32264 is the root category of countries
    return fred.get_child_categories(32264)

def getavailableseries(category):
    return fred.get_series_in_a_category(category)

def get_time_series(id):
    return fred.get_series_df(id)