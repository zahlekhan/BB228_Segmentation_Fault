import random
import multiprocessing 

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

filepath = './utsDatasetWithoutVia.txt'
with open(filepath,'r',encoding = 'utf-8') as infile:
    sents = infile.read().strip().split('\n')

iteration = 40
for i in range(iteration):	
	length = len(arr)
	for sent in sents:
		sent = sent  + " "
		ind1 = random.randrange(0, length, 3)
		ind2 = random.randrange(0, length, 4)

		ticketNumber = str(random.randrange(1, 4))

		#print(sent)
		sent = sent.replace("{orig}", arr[ind1])
		sent = sent.replace("{dest}", arr[ind2])
		sent = sent.replace("{n}", ticketNumber)

		#Origin data for training
		startOrigEntity = sent.index(arr[ind1])
		lenEntity = len(arr[ind1])
		endOrigEntity = startOrigEntity + lenEntity

		#Destination data for training
		startDestEntity = sent.index(arr[ind2])
		lenEntity = len(arr[ind2])
		endDestEntity =  startDestEntity + lenEntity

		startTicketNumber = sent.index(ticketNumber)
		endTicketNumber = startTicketNumber+1 

		sent= sent.lower()

		fp.write('	{ \n')
		fp.write('	"text": "' + sent + '",\n')
		fp.write('	"intent": "UnreservedTicketWithoutVia", \n')
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


		fp.write('	"start" : ' + str(startTicketNumber) + ', \n')
		fp.write('	"end":' + str(endTicketNumber) + ',\n')
		fp.write('	"value":"' + ticketNumber + '",\n')
		fp.write('	"entity": "ticketsNumber" \n    }')

		fp.write('\n')
		fp.write('	]\n')
		fp.write('	}, \n')


filepath = './utsDatasetWithVia.txt'
with open(filepath,'r',encoding = 'utf-8') as infile:
    sents = infile.read().strip().split('\n')

iteration = 40
for i in range(iteration):	
	length = len(arr)
	for sent in sents:
		sent = sent  + " "
		ind1 = random.randrange(0, length, 3)
		ind2 = random.randrange(0, length, 4)
		ind3 = random.randrange(0, length, 3)
		ticketNumber = str(random.randrange(1, 4))

		# print(sent)
		sent = sent.replace("{orig}", arr[ind1])
		sent = sent.replace("{dest}", arr[ind2])
		sent = sent.replace("{terminal}",arr[ind3])
		sent = sent.replace("{n}", ticketNumber)


		# print(sent)
		#Origin data for training
		startOrigEntity = sent.index(arr[ind1])
		lenEntity = len(arr[ind1])
		endOrigEntity = startOrigEntity + lenEntity

		#Destination data for training
		startDestEntity = sent.index(arr[ind2])
		lenEntity = len(arr[ind2])
		endDestEntity =  startDestEntity + lenEntity


		startTicketNumber = sent.index(ticketNumber)
		endTicketNumber = startTicketNumber +1 

		startTerminalEntity = sent.index(arr[ind3])
		endTerminalEntity =  startTerminalEntity + len(arr[ind3])

		sent= sent.lower()

		fp.write('	{ \n')
		fp.write('	"text": "' + sent + '",\n')
		fp.write('	"intent": "UnreservedTicketVia", \n')
		fp.write('	"entities": [\n   { \n ')


		startTicketNumber = sent.index(ticketNumber)
		endTicketNumber = startTicketNumber +1 
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


		fp.write('	"start" : ' + str(startTerminalEntity) + ', \n')
		fp.write('	"end":' + str(endTerminalEntity) + ',\n')
		fp.write('	"value":"' + arr[ind3].lower() + '",\n')
		fp.write('	"entity": "viaStation" \n    }')

		fp.write(',\n')
		fp.write('	{ \n')

		fp.write('	"start" : ' + str(startTicketNumber) + ', \n')
		fp.write('	"end":' + str(endTicketNumber) + ',\n')
		fp.write('	"value":"' + ticketNumber + '",\n')
		fp.write('	"entity": "ticketsNumber" \n    }')

		fp.write('\n')
		fp.write('	]\n')
		fp.write('	}, \n')

############### random ###################

fp.write('	{ \n')				
fp.write('	"text": "'+ 'random' + '",\n')
fp.write('	"intent": "random", \n')
fp.write('	"entities": [\n   { \n ')

fp.write('	"start" : ' '0' + ', \n')
fp.write('	"end":' + '6' + ',\n')
fp.write('	"value":"' "random" + '",\n')
fp.write('	"entity": "random" \n   }')

fp.write('\n')
fp.write('	]\n')
fp.write('	}, \n')


fp.write('	{ \n')				
fp.write('	"text": "'+ 'random 1' + '",\n')
fp.write('	"intent": "random", \n')
fp.write('	"entities": [\n   { \n ')

fp.write('	"start" : ' '0' + ', \n')
fp.write('	"end":' + '6' + ',\n')
fp.write('	"value":"' "random" + '",\n')
fp.write('	"entity": "random" \n   }')

fp.write('\n')
fp.write('	]\n')
fp.write('	} \n')
		
######################################


fp.write(']' + '\n')
fp.write('} \n')
fp.write('} \n')
fp.close();