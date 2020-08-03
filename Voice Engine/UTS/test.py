from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Metadata, Interpreter

model_directory = './models/default/model_20200803-012553'
interpreter = Interpreter.load(model_directory)
print(interpreter.parse(u"can i buy 1 unreserved bookings from bangalore urban towards jodhpur going through bundi "))
