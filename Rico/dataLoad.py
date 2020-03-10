import pandas as pandas

def loadData():
	df = pandas.read_json(r'./data.json')
	print(df['artwork_name'])


loadData()