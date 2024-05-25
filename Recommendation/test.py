from recommend import CF
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse

# test Sử dụng class CF
rate_train = np.array([
    [0, 0, 5],
    [0, 1, 4],
    [1, 0, 4],
    [1, 2, 5],
    [2, 1, 5],
    [2, 2, 3],
])

rate_test = np.array([
    [0, 2, 5],
    [1, 1, 4],
    [2, 0, 4],
])

# Đảm bảo không có giá trị âm trong dữ liệu
rate_train = np.abs(rate_train)
rate_test = np.abs(rate_test)

# Khởi tạo và huấn luyện mô hình CF
rs = CF(rate_train, k=2, uuCF=1)
rs.fit()

# Dự đoán và tính RMSE
n_tests = rate_test.shape[0]
SE = 0  # squared error
for n in range(n_tests):
    pred = rs.pred(rate_test[n, 0], rate_test[n, 1], normalized=0)
    SE += (pred - rate_test[n, 2])**2 

RMSE = np.sqrt(SE/n_tests)
print('User-user CF, RMSE =', RMSE)
