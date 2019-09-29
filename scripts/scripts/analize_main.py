# -*- coding: utf-8 -*- 

import sys
import csv
import pandas as pd
import re



#df = pd.read_csv('chislo_zaregistrirovannykh_rodivshikhsya.csv', header  = 0, index_col = 0)

with open('regions.csv', 'r', encoding = 'utf-8') as f:
    regions = list(csv.reader(f, delimiter = ';'))

regions[0][0] = '1'

def clear_key(value):
    value = value.split(',')[0]
    value = int(value)
    return value
regions = {v : clear_key(k) for k, v in regions}

#print(regions)
new_json = {}
years_indexes = {}
#print(df.head())
new_data = []
with open('chislo_zaregistrirovannykh_rodivshikhsya.csv', 'r', encoding = 'utf-8') as f:
    csv_reader = list(csv.reader(f, delimiter = ';'))
    labels = csv_reader[0]
    labels[0] = 'регион'
    print(labels)
    for index, name in enumerate(labels):
        res = re.findall('.*([0-9]{4})', name)
        if res: 
            year = res[0]
            if year not in years_indexes: years_indexes[year] = []
            years_indexes[year].append(index)
    for row in csv_reader[1:]:
        cur_data = {}
        for index, val in enumerate(row):
            if index == 0:
                cur_data['region_name'] = val
                cur_data['region_code'] = regions.get(cur_data['region_name'])
            label_name = labels[index]
            res = re.findall('.*([0-9]{4})', label_name)
            if res: 
                year = res[0]
                if year not in cur_data: 
        new_data.append(cur_data)

#print(years_indexes)

for row in new_data:
    print(row)
    #for row in csv_reader:
    #    for element, index in 
    #    #print(row)
    #    region_name = row[0]
    #    region = regions.get(region_name)
    #    region
    #    print(region)
       