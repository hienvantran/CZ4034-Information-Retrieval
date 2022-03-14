import streamlit as st
import pandas as pd
import numpy as np
from streamlit_echarts import st_echarts

title = st.title('Title')

st.header('Header')
text = st.text_input('Enter Query', placeholder= 'Query...')
st.button('Search')

option = st.selectbox(
     'Select',
     ('1', '2', '3'))

col1, col2, col3 = st.columns(3)
col1.metric("Data1", "1")
col2.metric("Data2", "2")
col3.metric("Data3", "3")

container = st.container()
container.write("Tweet1")
# Now insert some more in the container
container.write("Tweet2")

df = pd.DataFrame(
     np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4],
     columns=['lat', 'lon'])

st.map(df)


option = {
    "legend": {"top": "bottom"},
    "toolbox": {
        "show": True,
        "feature": {
            "mark": {"show": True},
            "dataView": {"show": True, "readOnly": False},
            "restore": {"show": True},
            "saveAsImage": {"show": True},
        },
    },
    "series": [
        {
            "name": "graph",
            "type": "pie",
            "radius": [50, 250],
            "center": ["50%", "50%"],
            "roseType": "area",
            "itemStyle": {"borderRadius": 8},
            "data": [
                {"value": 40, "name": "rose 1"},
                {"value": 38, "name": "rose 2"},
                {"value": 32, "name": "rose 3"},
                {"value": 30, "name": "rose 4"},
                {"value": 28, "name": "rose 5"},
                {"value": 26, "name": "rose 6"},
                {"value": 22, "name": "rose 7"},
                {"value": 18, "name": "rose 8"},
            ],
        }
    ],
}

st_echarts(options=option, height="600px")

#jina.text_search(endpoint="http://0.0.0.0:45678/api/search")

