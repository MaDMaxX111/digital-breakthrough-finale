import sklearn.linear_model as lm

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('linear_regression_df.csv')
df.columns = ['X', 'Y']
res = df.head()

print(res)
x = df['X']
y = df['Y']

data = list(zip(x, y))
data.sort()
x = [i[0] for i in data]
y = [i[1] for i in data]

plt.plot(x, y)
plt.show()

linear = lm.LinearRegression()

trainX = np.asarray(x[:-10]).reshape(-1, 1)
trainY = np.asarray(y[:-10]).reshape(-1, 1)

testX = np.asarray(x[-10:]).reshape(-1, 1)
#testY = np.asarray(y[20:]).reshape(-1, 1)

linear.fit(trainX, trainY)

#print(linear.score(trainX, trainY))

res = linear.predict(testX)

y = y[:-10] + list(res)

plt.plot(x, y)
plt.show()


print('done')
