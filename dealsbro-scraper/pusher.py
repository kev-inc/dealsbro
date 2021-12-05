import json
import requests
import time
import random

url = "https://dealsbro-api.kevc.workers.dev/outlets"

# Opening JSON file
with open('mcdonalds.json') as json_file:
    data = json.load(json_file)
    for entry in data:
        x = requests.post(url, json = entry)
        print(x.status_code, entry['name'], x.json())
        retryCount = 0
        while x.status_code != 201 and retryCount < 3:
            retryCount += 1
            time.sleep(random.uniform(3,5))
            x = requests.post(url, json = entry)
            print("Retry", retryCount, entry['name'], x.status_code, x.json())
        time.sleep(random.uniform(3,5))
