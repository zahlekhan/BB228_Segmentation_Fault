import random


arr = ["Kanpur","Delhi","Bhopal","Jhansi","Kochi","Varanasi","Hyderabad","Lucknow","Bilaspur","Jaipur",
"Agra","Patna","Bangalore","Mumbai","Udaipur","Lalitpur","Bilaspur","Buxar","Kanyakumari","Guwahati",
"Srinagar","Allahabad","BhilaiRaipur","Akaltara","Diburgarh","Jalpaiguri","Nagpur","Pune","Bareily","Indore","Wayanad","Ayodhya","Sagar"]

stationData = './stationData.txt'
with open(stationData, 'r' ,encoding = 'utf-8') as stationFile:
	stations = stationFile.read().strip().split('\n')

for station in stations:
	arr.append(station)
	
fp = open("./train_data1.json",'w')
fp.write('{\n "rasa_nlu_data":{\n')
fp.write('\n "regex_features": [],\n "entity_synonyms": [],')
fp.write('"common_examples":[')

filepath = './enquiryData.txt'
with open(filepath,'r',encoding = 'utf-8') as infile:
    sents = infile.read().strip().split('\n')

iteration = 120
for i in range(iteration):	
	for sent in sents:
		sent = sent  + " "
		ind1 = random.randrange(1, 3, 3)
		ind2 = random.randrange(1000, 10000, 4)

		trainNumber = str(ind1) + str(ind2) 
		sent = sent.replace("{train}", trainNumber)
		
		#Train number data for training
		startTrainNumberEntity = sent.index(trainNumber)
		lenEntity = len(trainNumber)
		endTrainNumberEntity = startTrainNumberEntity + lenEntity

		sent= sent.lower()

		fp.write('	{ \n')
		fp.write('	"text": "' + sent + '",\n')
		fp.write('	"intent": "running status", \n')
		fp.write('	"entities": [\n   { \n ')


		fp.write('	"start" : ' + str(startTrainNumberEntity) + ', \n')
		fp.write('	"end":' + str(endTrainNumberEntity) + ',\n')
		fp.write('	"value":"' + trainNumber + '",\n')
		fp.write('	"entity": "trainNumber" \n   }')

		fp.write('\n')
		fp.write('	]\n')
	#	if(i!=iteration-1):
		fp.write('	}, \n')
		# else:
		# 	fp.write('	} \n')

filepath1 = './pnrStatusData.txt'
with open(filepath1,'r',encoding = 'utf-8') as infile1:
    sents1 = infile1.read().strip().split('\n')

for i in range(iteration):
	for sent in sents1:
		sent = sent + " "

		pnrNumber = str(random.randrange(10001, 99999,4)) + str(random.randrange(10001, 99999,4))
		# print(pnrNumber)
		# print(sent + "semt")
		sent = sent.replace('{pnr}', pnrNumber)
		startPnrNumberEntity = sent.index(pnrNumber)
		lenEntity = len(pnrNumber)
		endPnrNumberEntity = startPnrNumberEntity + lenEntity

		sent = sent.lower()


		fp.write('	{ \n')
		fp.write('	"text": "' + sent + '",\n')
		fp.write('	"intent": "pnr number", \n')
		fp.write('	"entities": [\n   { \n ')


		fp.write('	"start" : ' + str(startPnrNumberEntity) + ', \n')
		fp.write('	"end":' + str(endPnrNumberEntity) + ',\n')
		fp.write('	"value":"' + pnrNumber + '",\n')
		fp.write('	"entity": "pnrNumber" \n   }')


		fp.write('\n')
		fp.write('	]\n')
		fp.write('	}, \n')


filepath = './utsDataset.txt'
with open(filepath,'r',encoding = 'utf-8') as infile:
    sents = infile.read().strip().split('\n')

iteration = 120

iteration = 120
for i in range(iteration):	
	for sent in sents:
		sent = sent  + " "
		ind1 = random.randrange(0, length, 3)
		ind2 = random.randrange(0, length, 4)
		ticketsNumber = str(random.randrange(1,4,3))

		sent = sent.replace("{orig}", arr[ind1])
		sent = sent.replace("{dest}", arr[ind2])
		sent = sent.replace('{n}', ticketsNumber)

		#Origin data for training
		startOrigEntity = sent.index(arr[ind1])
		lenEntity = len(arr[ind1])
		endOrigEntity = startOrigEntity + lenEntity

		#Destination data for training
		startDestEntity = sent.index(arr[ind2])
		lenEntity = len(arr[ind2])
		endDestEntity =  startDestEntity + lenEntity

		startTicketEntity = sent.index(ticketsNumber)
		lenEntity = len(ticketsNumber)
		endTicketEntity = startTicketEntity + lenEntity

		sent= sent.lower()

		fp.write('	{ \n')
		fp.write('	"text": "' + sent + '",\n')
		fp.write('	"intent": "unreservedBookings", \n')
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


		fp.write(',\n')
		fp.write('	{ \n')


		fp.write('	"start" : ' + str(startTicketEntity) + ', \n')
		fp.write('	"end":' + str(endTicketEntity) + ',\n')
		fp.write('	"value":"' + ticketsNumber + '",\n')
		fp.write('	"entity": "ticketsNumber" \n    }')

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