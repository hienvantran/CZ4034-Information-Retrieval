# CZ4034-Information-Retrieval

## Project Overview

On 31 December 2019, WHO was informed of cases of pneumonia of unknown cause in Wuhan City, China. Many cases later, the official name of COVID-19 was issued by WHO on 11 February 2020. COVID-19 has affected millions of lives and despite widespread immunization against COVID-19, there is still a sizable group of people who reject vaccination (anti-vaxxers) or people who are against certain types of vaccines such as Covaxin, Moderna, Sputnik or Sinovac for various reasons. It’s critical for vaccine firms and government agencies to understand what people are worried about when it comes to being vaccinated against current and future pandemics. Individuals may also wish to know what the public thinks about a specific vaccine or what is currently trending about a specific vaccine topic. However, reading through many netizens’ thoughts to gain a sense of the public’s opinion on immunisation or to find out what is trending is not practical. As a result, an information retrieval system is required that not only displays search results but also predicts netizen sentiment on a topic and displays overall public sentiment.

## Project objectives

The purpose of this assignment is to create and build an information system that does sentimental analysis of netizens’ opinions of COVID-19 vaccinations. This information retrieval system can help shed light for future vaccine companies to discover what customers want, such as transparency in data for future pandemic vaccines. We will focus on vaccination firms such as Covaxin, Moderna, Sputnik and Sinovac in this assignment.

Demo: https://youtu.be/3MM8Nxhb4WQ

## Technical details

### Tech stack

- Tweets Retrival: Twitter API, Python
- Frontend: ReactJS, HTML, CSS
- Backend: Flask (Python), Solr (Database - Indexing and querying tweets)
- Deep Learning modelling: Tensorflow, PyTorch, scikit-learn

### Frontend

For screenshot demo of the UI, refer to the Assignment Report

```
cd frontend/my-app/
npm install .
npm start
```

### Backend

1. Create virtual environment under backend folder and install libs:

```
python -m venv venv
venv/Scripts/activate - for window
pip install -r requirements.txt
```

2. Start the solr with "bin\solr.cmd start" command on Windows
3. Start Flask:

```
flask run
```

4. Unzip the weights.zip for model in folder backend/models/roberta

5. Other model weights can be found here:
   https://drive.google.com/drive/folders/10kl7DZ4wr5qKvBDq1dzzEfFfbJiuGdbB?usp=sharing

6. Run Solr under backend/Solr-8.11.1:
   `bin\solr.cmd start `

## Note:

1. Run all backends before starting frontend.
2. Run multiple ports in local will need to allow cross-origin. Please google how to fix this.
3. Create folder for classifiers under backend folder
