import requests
from bs4 import BeautifulSoup
import json
import sys 

url = "https://www.funda.nl/zoeken/huur?selected_area=%5B%22gemeente-amsterdam%22%5D&price=%22-2000%22&publication_date=%223%22&floor_area=%2250-%22"

headers = {
    'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
}

# def main() :
html = requests.get(url, headers= headers)

if html.status_code ==200:
    soup = BeautifulSoup(html.content, 'html.parser')
else:
    print('Connection failed!')

if soup.find('script', type='application/ld+json') != None:

    houseData = json.loads(soup.find('script', type='application/ld+json').text)
    house = []

    for item in houseData['itemListElement']:
        houseUrl = item['url']
        houseHtml = requests.get(houseUrl, headers= headers)
        if houseHtml.status_code ==200:
            soup = BeautifulSoup(houseHtml.content, 'html.parser')
        else:
            print('Connection failed!')
        
        houseDetail = json.loads(soup.find('script', type='application/ld+json').text)

        last = houseDetail['description'].find(houseDetail['name'])+len(houseDetail['name']) + 1 
        postCode = houseDetail['description'][last:last+7]
        houseUrl = houseDetail['id']
        
        
        img = []
        for photo in houseDetail['photo'] :
            img.append(photo['contentUrl'])
        
        if 'price' in houseDetail['offers']:
            houseprice = houseDetail['offers']['price']
        else :
            houseprice = 0
        
        thisdict = dict(name = houseDetail['name'], city = houseDetail['address']['addressLocality'], region = houseDetail['address']['addressRegion'], postcode = postCode, price = houseprice, imgUrl = img, url = houseUrl)
        house.append(thisdict)
    json_object = json.dumps(house)
    print(json_object)
else:
    json_object = {}
    print(json_object)