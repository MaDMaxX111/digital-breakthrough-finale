'''
1. открыть csv
2. по каждой строке считать данные в список, первый список заголовков расширить ногадми с 2019 по 2024
3. в каждой строке нужно спронозитровать на 5 лет вперёд, записать в новый список
построить прогностическую модель по каждой строке, нужно добавить значения в строку, далее нужно постоить график для проверки
'''

import sklearn.linear_model as lm

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

with open('1_bearch.csv', encoding = 'utf-8') as f:
    data = [row.replace('\n', '').split(';') for row in f.readlines()]
    data[0][0] = 'регион'

new_data = []
for row_index, row in enumerate(data):
    cur_row = data[row_index]
    if row_index == 0:
        cur_row.extend(['2019', '2020', '2021', '2022', '2023', '2024'])
    else:
        cur_region = cur_row[0]
        y = list(map(lambda x: float(x.replace(',', '.')), cur_row[2:]))
        #print(cur_region, len(y))
        
        # построим график текущих значений
        x = list(range(1, len(y) + 1))
        #plt.plot(x, y)
        #plt.show()
        
        # спрогнозируем ещё пять лет, сделаем график прогноза
        
        linear = lm.LinearRegression()
        predict_x = list(range(len(y) + 1, len(y) + 1 + 5 + 1))
        #print(predict_x)
        trainX = np.asarray(x).reshape(-1, 1)
        trainY = np.asarray(y).reshape(-1, 1)
        
        testX = np.asarray(predict_x).reshape(-1, 1)
        
        linear.fit(trainX, trainY)
        
        #print(linear.score(trainX, trainY))
        
        testY = linear.predict(testX)
        y_predict = [int(x[0]) for x in list(testY)]
        #print(testY, y_predict)
        #print(testY)
        #print(x + predict_x)
        #plt.plot(x + predict_x, y + y_predict)
        #plt.show()
        cur_row.extend(list(map(str, y_predict)))
    
    new_data.append(cur_row)
    #data[row_index] = cur_row
    
import csv

with open('01_bearth_export.csv', mode = 'w', encoding = '') as f:
    f_writer = csv.writer(f, delimiter=';', lineterminator="\n")
    for row in new_data:
        #print(row)
        f_writer.writerow(row)
    