import numpy as np
from flask import Flask,request,jsonify, render_template
from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Metadata, Interpreter
import pickle

app = Flask(__name__)
model_directory = '../EnquiryIntent/models/default/model_20200802-124906'
interpreter = Interpreter.load(model_directory)
#model = pickle.load(open('./models/default/model_20200725-160314/crf_model.pkl'))

@app.route('/', methods=['POST','GET'])
def predict():
	req = request.get_json()["text"]
	#print(interpreter.parse(u"i want to go from kanpur to delhi"))
	#res = jsonify(req)
	print(req)
	req = req.lower()
	res = interpreter.parse(req)
	
	return jsonify(res)

if __name__ == '__main__':
	app.run(debug = True,host='0.0.0.0',port=5002)
