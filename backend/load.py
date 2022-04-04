import pandas as pd
import numpy as np

import nltk
import re

from sklearn.metrics import accuracy_score, precision_score, recall_score
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer

from joblib import load
import pickle
import spacy
import emoji
import string

nltk.download('punkt')

def vectorize(data, vectorizer):
    X_tfidf = vectorizer.transform(data)
    words = vectorizer.get_feature_names_out()
    X_tfidf_df = pd.DataFrame(X_tfidf.toarray())
    X_tfidf_df.columns = words
    return(X_tfidf_df)

def punc_clean(text):
    text= ' '.join(re.sub('(@[A-Za-z0-9_]+)|(&[A-Za-z0-9_]+)|([^0-9A-Za-z \t]) |(\w+:\/\/\S+)|(["“)#!?”(-.%&$,*/;:<>=\/|^`{}~])' , " ", text).split())
    text = re.sub('[0-9]+', '', text)
    text = re.sub('['+string.punctuation+']', '', text)
    return text

def replace_name(text): 
    # Convert these @pfizer, @sinovac, @moderna_tx, @sputnikvaccine to normal form pfizer/sinovac/moderna/sputnik
    vaccine_dict = {"@pfizer": "pfizer",
                    "@sinovac": "sinovac",
                   "@moderna_tx": "moderna",
                   "@sputnikvaccine": "sputnik"}
    
    for key in vaccine_dict:
        if key in text:
            text = text.replace(key, vaccine_dict[key])
    
    return text

def space(text, nlp):
    doc = nlp(text)
    return " ".join([token.lemma_ for token in doc])

def preprocess(text, nlp):
    
    text = replace_name(text)
    text = text.lower()
    text = emoji.demojize(text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = punc_clean(text)
    text = space(text, nlp)

    return text

def load_model(text):
    # df = pd.read_csv("data.csv", encoding = "unicode_escape")
    # X_data = df[['text_clean']].to_numpy().reshape(-1)
    # y_data = df[['label']].to_numpy().reshape(-1)
    nlp = spacy.load("en_core_web_sm")
    text = preprocess(text, nlp)
    X_data = pd.DataFrame([text]).to_numpy().reshape(-1)

    with open("./models/ensemble + boosting + RF/weights/tfidf.pickle", "rb") as read_file:
        vectorizer = pickle.load(read_file)
    
    X_data = vectorize(X_data, vectorizer)

    clf = load("./models/ensemble + boosting + RF/weights/Ensemble.joblib")

    y_pred = clf.predict(X_data)
    categories = {1: "NEGATIVE", 2:"NEUTRAL", 3: "POSITIVE"}
    # print(f'Predicted class is: ', pred_class)
    return categories[y_pred[0]]
