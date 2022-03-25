import pandas as pd
import tweepy
import os
import re
import json

CONSUMER_KEY = 'DZO4o46uebmsiM3QijUmbMj1J',
CONSUMER_SECRET_KEY =    'jA9g5FaYIeXwrxTNrBM5zXqVJrjfqh1vEJzB0OwGyXfWvP2oN4',
ACCESS_TOKEN   = '1493791152159739904-wyTZRFyyLxYqhcYu13SAgJG528a5h2',
ACCESS_TOKEN_SECRET= 'Yf29sYInnBFgFzUo7Iy2wdrWPyGhkgjlMiNpHVjUPo8R9',

# Function to remove @names and special character
def punc_clean(text):
    
    text= ' '.join(re.sub('(@[A-Za-z0-9_]+)|(&[A-Za-z0-9_]+)|([^0-9A-Za-z \t]) |(\w+:\/\/\S+)|(["“)#!?”(.%&$,*/;:<>=\/|^`{}~])' , " ", text).split())

    return text
        
def replace_name(data): 
    # Convert these @pfizer, @sinovac, @moderna_tx, @sputnikvaccine to normal form pfizer/sinovac/moderna/sputnik
    
    vaccine_dict = {"@pfizer": "pfizer",
                    "@sinovac": "sinovac",
                   "@moderna_tx": "moderna",
                   "@sputnikvaccine": "sputnik"}
    
    for index in range(len(data)):
        if "@pfizer" in data.loc[index, 'text']:
            vaccine_name = "@pfizer"
            replace_name = vaccine_dict[vaccine_name]
            data.loc[index, 'text'] = data.loc[index, 'text'].replace(vaccine_name, replace_name)

        if "@sinovac" in data.loc[index, 'text']:
            vaccine_name = "@sinovac"
            replace_name = vaccine_dict[vaccine_name]
            data.loc[index, 'text'] = data.loc[index, 'text'].replace(vaccine_name, replace_name)

        if "@moderna_tx" in data.loc[index, 'text']:
            vaccine_name = "@moderna_tx"
            replace_name = vaccine_dict[vaccine_name]
            data.loc[index, 'text'] = data.loc[index, 'text'].replace(vaccine_name, replace_name)

        if "@sputnikvaccine" in data.loc[index, 'text']:
            vaccine_name = "@sputnikvaccine"
            replace_name = vaccine_dict[vaccine_name]
            data.loc[index, 'text'] = data.loc[index, 'text'].replace(vaccine_name, replace_name)
            
    return data
    
def preprocess(data):
    
    data = replace_name(data)
    data['text'] = data['text'].apply(punc_clean)
    data['creation_date_time'] = data['creation_date_time'].apply(lambda x: x[:10])
    data["location"].fillna("No Location", inplace = True)
    
    has_duplicate = data.duplicated(subset=['text']).any()
    if has_duplicate:
        data.drop_duplicates(subset=['text'], inplace=True)
        
    return data

def crawl_NewData(query):
    # 1 - 'Pfizer/BioNTech vaccine OR Pfizer-BioNTech vaccine OR Pfizer vaccine OR BioNTech vaccine OR pfizer lang:en'
    # 2 - 'Sinovac-CoronaVac vaccine OR Sinovac vaccine OR CoronaVac vaccine OR sinovac lang:en'
    # 3 - 'Moderna vaccine OR moderna OR Moderna Covid-19 vaccine lang:en'
    # 4 - 'Covaxin vaccine OR covaxin lang:en'
    # 5 - 'Sputnik V vaccine OR Sputnik vaccine OR sputnik V OR russia sputnik vaccine lang:en'
    # 6 - 'covid19 vaccine OR covid vaccine OR Coronavirus Vaccine OR coronovarius vaccine lang:en'
    
    BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAAI4ZQEAAAAA0CuD4%2BikWrOFi7myfncjcqXq2k8%3DjhlvJW1e8IMkuYcMeeCgqxpeoR66QgUcuUWeWRzf9Fobxmbn9L'
    client = tweepy.Client(bearer_token=BEARER_TOKEN, wait_on_rate_limit=True) # need to include wait_on to prevent error popping

    all_tweets = []
    for tweet in tweepy.Paginator(client.search_recent_tweets,query=query,tweet_fields=['author_id','lang', 'created_at','public_metrics'], max_results=100).flatten(limit=300):
        
        # Check if tweets is in english language and filter off RT aka retweets
        if tweet.lang == 'en' and 'RT' not in tweet.text:
            
            tweet_id = tweet.id
            user_id =  tweet.author_id
            text = tweet.text
            creation_time = tweet.created_at
            
            public_metrics = tweet.public_metrics
            retweet_count = public_metrics['retweet_count']
            like_count = public_metrics['like_count']
            
            user = client.get_user(id=user_id, user_fields=['location']).data
            username = user['username']
            location = user['location']
            all_tweets.append([tweet_id, user_id, username, text, like_count, retweet_count, location, creation_time])
            
    tweets = pd.DataFrame(all_tweets, columns= ['tweet_id', 'user_id','username','text','like_count', 'retweet_count', 'location','creation_date_time'])
    
    cleaned_tweet = preprocess(tweets)

    # Convert the dataframe into json format
    data = [{"id": index, "tweet_id": tweet['tweet_id'], "user_id":tweet['user_id'], "username":tweet['username'] ,'tweet':tweet['text'], 'like_count':tweet['like_count'], 'retweet_count':tweet['retweet_count'],"location":tweet['location'] ,'creation_date_time':tweet['creation_date_time']} for index, tweet in cleaned_tweet.iterrows()]
    
    return data


