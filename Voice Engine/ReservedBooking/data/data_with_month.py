import random

arr = ["Kanpur","Delhi","Bhopal","Jhansi","Kochi","Varanasi","Hyderabad","Lucknow","Bilaspur","Jaipur",
"Agra","Patna","Bangalore","Mumbai","Udaipur","Lalitpur","Bilaspur","Buxar","Kanyakumari","Guwahati",
"Srinagar","Allahabad","BhilaiRaipur","Akaltara","Diburgarh","Jalpaiguri","Nagpur","Pune","Bareily","Indore","Wayanad","Ayodhya","Sagar"]

dates = ['','1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th',
'13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23rd','24th',
'25th','26th','27th','28th','29th','30th','31st']

months = ['jan','feb', 'march', 'april','may', 'june', 'july', 'august', 'september', 'october', 'november', 'december','january','february']
filepath = './backup.txt'

stationData = './stationData.txt'
with open(stationData, 'r' ,encoding = 'utf-8') as stationFile:
	stations = stationFile.read().strip().split('\n')

for station in stations:
	arr.append(station)

with open(filepath,'r',encoding = 'utf-8') as infile:
    sents = infile.read().strip().split('\n')


length = len(arr)
fp = open("./train_data1.json",'w')
fp.write('{\n "rasa_nlu_data":{\n')
fp.write('\n "regex_features": [],\n "entity_synonyms": [],')
fp.write('"common_examples":[')

iteration = 120
for i in range(iteration):	
	for sent in sents:
		sent = sent  + " "
		ind1 = random.randrange(0, length, 3)
		ind2 = random.randrange(0, length, 4)
		sent = sent.replace("{orig}", arr[ind1])
		sent = sent.replace("{dest}", arr[ind2])


		# date creation logic
		date = dates[random.randrange(1, 32, 3)]
		month = months[random.randrange(0, 15, 3)]
		year = random.randrange(2010, 2030, 3)

		dateType1 = str(date) + " " + str(month) + " "  + str(year)
		dateType2 = str(month) + " " + str(date)
		dateType3 = str(date) + " of " + str(month)
		dateType4 = str(random.randrange(1, 32, 3)) + " " + str(month)

		dateList = [dateType1, dateType2, dateType3, dateType4]
		finalDate = dateList[random.randrange(0,4,3)]

		# Date data for training
		isDatePresent = 'false'
		if "{date}" in sent:
			isDatePresent = 'true'

		if isDatePresent=='true':
			sent = sent.replace("{date}", finalDate)
			startDateEntity = sent.index(finalDate)
			lenEntity = len(finalDate)
			endDateEntity = startDateEntity + lenEntity

		#Origin data for training
		startOrigEntity = sent.index(arr[ind1])
		lenEntity = len(arr[ind1])
		endOrigEntity = startOrigEntity + lenEntity

		#Destination data for training
		startDestEntity = sent.index(arr[ind2])
		lenEntity = len(arr[ind2])
		endDestEntity =  startDestEntity + lenEntity

		sent= sent.lower()

		fp.write('	{ \n')
		fp.write('	"text": "' + sent + '",\n')
		fp.write('	"intent": "travel", \n')
		fp.write('	"entities": [\n   { \n ')


		fp.write('	"start" : ' + str(startDestEntity) + ', \n')
		fp.write('	"end":' + str(endDestEntity) + ',\n')
		fp.write('	"value":"' + arr[ind2].lower() + '",\n')
		fp.write('	"entity": "dest" \n   }')

		fp.write(',\n')
		fp.write('	{ \n')


		fp.write('	"start" : ' + str(startOrigEntity) + ', \n')
		fp.write('	"end":' + str(endOrigEntity) + ',\n')
		fp.write('	"value":"' + arr[ind1].lower() + '",\n')
		fp.write('	"entity": "orig" \n    }')

		if isDatePresent=='true':
			fp.write(',\n')
			fp.write('	{ \n')


			fp.write('	"start" : ' + str(startDateEntity) + ', \n')
			fp.write('	"end":' + str(endDateEntity) + ',\n')
			fp.write('	"value":"' + finalDate + '",\n')
			fp.write('	"entity": "date" \n    }')

		fp.write('\n')
		fp.write('	]\n')
	#	if(i!=iteration-1):
		fp.write('	}, \n')
		# else:
		# 	fp.write('	} \n')

fp.write(']' + '\n')
fp.write('} \n')
fp.write('} \n')
fp.close();
