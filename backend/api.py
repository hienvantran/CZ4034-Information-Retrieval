from urllib import response
from flask import Flask, request, make_response, redirect, render_template, send_file
import requests
import json
from update_crawl import crawl_NewData
import logging
logging.basicConfig(level=logging.DEBUG)
logging.basicConfig(level=logging.DEBUG)
from wordcloud import WordCloud, ImageColorGenerator
import matplotlib.pyplot as plt
import pandas as pd
from urllib.request import urlopen, Request
import io
from io import BytesIO
import pysolr
from urllib import *
import sys


app = Flask(__name__)


@app.route('/update/<vaccine_id>')
def get_latest_twt(vaccine_id):
    logging.info('id: %s', vaccine_id)
    update_url = "http://localhost:8983/solr/CZ4034/update/json"
    querystring = {"commit": "true"}
    headers = {'Content-Type': 'application/json',
               'Accept': 'application/json'}

    data = crawl_NewData(vaccine_id)

    response = requests.post(update_url, data=json.dumps(
        data), headers=headers, params=querystring)
    logging.info('Updated')
    logging.debug(response)

    return {'data': data}

# @app.route('/images/345')
# def images():
#     return render_template("images.html", title='test')


@app.route('/fig/345')
def fig():
    connection = urlopen('http://localhost:8983/solr/CZ4034/query?q=*:*&q.op=OR&indent=true&rows=10189&wt=json')

    response = json.load(connection)
    list = []

    for i in response['response']['docs']:
        if "text" in i:
            list.append(i['text'])
    
    df = pd.DataFrame(list, columns=['product_name'])


    words = ' '.join([word for word in df['product_name']])
    word_cloud = WordCloud(width=1000, height=500, random_state=20, max_font_size=120).generate(words)
    plt.imshow(word_cloud, interpolation='bilinear')
    plt.axis("off")
    img = BytesIO()
    word_cloud.to_image().save(img, 'PNG')
    img.seek(0)

    return send_file(img, mimetype='image/png')

    # fig, ax = plt.subplots(figsize=(12,6))
    # img = StringIO()
    # fig.savefig(img)
    # img.seek(0)
    # return send_file(img, mimetype='image/png')

# @app.route('/test/111')
# def test():
    
#     connection = urlopen('http://localhost:8983/solr/CZ4034/query?q=*:*&q.op=OR&indent=true&rows=10189&wt=json')
    
#     response = json.load(connection)
#     list = []

#     for i in response['response']['docs']:
#         if "text" in i:
#             list.append(i['text'])

#     # df = pd.DataFrame(list, columns=['product_name'])
#     # words = ' '.join([word for word in df['product_name']])

#     return (str(list[2]))
#     #return (str(response['response']['docs'][0].keys()))


    
