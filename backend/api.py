from flask import Flask, request, make_response, redirect
import requests
import json
from update_crawl import crawl_NewData
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

    response = requests.post(update_url, data=json.dumps(
        data), headers=headers, params=querystring)
    logging.info('Updated')
    logging.debug(response)

    return {'data': data}
