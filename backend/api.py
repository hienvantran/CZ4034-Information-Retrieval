from flask import Flask, request, make_response, redirect
from wordcloud import WordCloud
import base64
from io import BytesIO
import requests
import json
from update_crawl import crawl_NewData
from load import load_model

import logging
logging.basicConfig(level=logging.DEBUG)


app = Flask(__name__)


@app.route('/update/<vaccine_id>')
def get_latest_twt(vaccine_id):
    logging.info('id: %s', vaccine_id)
    update_url = "http://localhost:8983/solr/CZ4034/update/json"
    querystring = {"commit": "true"}
    headers = {'Content-Type': 'application/json',
               'Accept': 'application/json'}

    data = crawl_NewData(vaccine_id)
    logging.info("New data")
    
    result = [dict(item, **{'sentiment': load_model(item['text'])}) for item in data]
    logging.debug(result[:5])
    response = requests.post(update_url, data=json.dumps(
        result), headers=headers, params=querystring)
    logging.info('Updated')
    logging.debug(response)

    return {'data': data}

@app.route('/visualization/', methods=["GET","POST"])
async def wordcloud():
    
    tweets = request.json

    # sentiment
    noPos = 0
    noNeu = 0
    noNeg = 0
    # textList
    textList = []
    for tweet in tweets:
        try:
            textList.append(tweet['text'])
            if tweet['sentiment'][0] == 'NEUTRAL': 
                noNeu += 1
            elif tweet['sentiment'][0] == 'POSITIVE':
                noPos += 1             
            else:
                noNeg += 1
        except:
            continue
    words = ' '.join([word for word in textList])
    word_cloud = WordCloud(width=1000, height=500,
                           random_state=20, max_font_size=120).generate(words)
    img = BytesIO()
    word_cloud.to_image().save(img, 'PNG')
    data = base64.b64encode(img.getvalue()).decode()
    
    
    return {"positive": noPos, "negative": noNeg, "neutral": noNeu, 'img': data}

