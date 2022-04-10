# CZ4034-Information-Retrieval

### Frontend
````
cd frontend/my-app/
npm install .
npm start
````

### Backend
1. Create virtual environment under backend folder and install libs:
````
python -m venv venv
venv/Scripts/activate - for window
pip install -r requirements.txt
````

2. Start the solr with "bin\solr.cmd start" command on Windows 
3. Start Flask:
````
flask run
````
4. Unzip the weights.zip for model in folder backend/models/ensemble+boosting+RF
5. Other model weights can be found here:
      https://entuedu-my.sharepoint.com/:f:/g/personal/eong016_e_ntu_edu_sg/EgT3tCY8ZbhLsZLOOu2byFQBGHNWYQVyn5LOGsD1VIsIew?e=jOGxMd

5. Run Solr under backend/Solr-8.11.1:
````bin\solr.cmd start ````
      
## Note: 
1. Run all backends before starting frontend.
2. Run multiple ports in local will need to allow cross-origin. Please google how to fix this.
3. Create folder for classifiers under backend folder
