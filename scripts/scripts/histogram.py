import matplotlib.pyplot as plt
import numpy as np

'''
mu, sigma = 100, 15
x = mu + sigma * np.random.randn(10000)
bins = [0, 40, 60, 75, 90, 110, 125, 140, 160, 200]
'''

with open('3_effect.csv', 'r', encoding = 'utf-8') as f:
    data = [row.replace('\n', '').split(';') for row in f.readlines()]
    data[0][0] = 'регион'

hist_data = [float(x[-1].replace(',', '.')) for x in data[1:]]

print(hist_data)


    
hist, bins = np.histogram(hist_data)#, normed=True, histtype='stepfilled')

print(hist)
print(bins)
s = sum(hist)
print(s/5)
print(list(zip(hist, bins[1:])))
print(sorted(hist))


#plt.hist(hist, len(hist))
#zip(hist, )


plt.show()



#fig.savefig("/tmp/out.png")