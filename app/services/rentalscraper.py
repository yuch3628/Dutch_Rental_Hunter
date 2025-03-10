from bs4 import BeautifulSoup
import json
from selenium import webdriver

url = "https://www.funda.nl/zoeken/huur?selected_area=%5B%22gemeente-amsterdam%22%5D&price=%22-2000%22&publication_date=%223%22&floor_area=%2250-%22"

headers = {
    'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
}

driver = webdriver.Chrome()

driver.implicitly_wait(10)
driver.get(url)
html = driver.page_source
soup = BeautifulSoup(driver.page_source, 'lxml')

if soup.find('script', type='application/ld+json') != None:
    houseData = json.loads(soup.find('script', type='application/ld+json').text)
    house = []
    for item in houseData['itemListElement']:
        houseUrl = item['url']

        driver.delete_all_cookies()
        driver.get(houseUrl)

        houseHtml = driver.page_source
        houseSoup = BeautifulSoup(houseHtml, 'lxml')
        houseDetail = json.loads(houseSoup.find('script', type='application/ld+json').text)
        
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
else:
    json_object = {}

print(json_object)
driver.quit()
