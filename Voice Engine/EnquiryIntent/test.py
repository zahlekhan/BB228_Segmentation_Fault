from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Metadata, Interpreter

model_directory = './models/default/31st_july_19_05'
interpreter = Interpreter.load(model_directory)
print(interpreter.parse(u"tell me what happened to pnr 8318497367"))
