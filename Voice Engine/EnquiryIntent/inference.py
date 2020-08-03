from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Trainer
from rasa_nlu import config
from rasa_nlu.model import Metadata, Interpreter
from rasa_nlu.training_data  import load_data
import time

print(time.time)
train_data = load_data('./data/train_data1.json')

trainer = Trainer(config.load("config.yml"))
trainer.train(train_data)
model_directory = trainer.persist('./models/')
print(model_directory + " test")
interpreter = Interpreter.load(model_directory)
print("jj")
interpreter.parse(u"i want to go from kanpur to delhi")