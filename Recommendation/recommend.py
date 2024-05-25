import numpy as np 
import pandas as pd 
import sklearn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel 
import random
import os

'''
Tạo gợi ý dựa trên hành vi Người dùng:** Sử dụng dữ liệu về hành vi duyệt web và mua hàng của người dùng để gợi ý sản phẩm phù hợp.
Cập nhật mô hình gợi ý:** Mô hình gợi ý cần được cập nhật định kỳ dựa trên dữ liệu mới nhất.
'''


# Hàm gợi ý dựa trên sản phẩm
def item_based(item_name, df):
    user_item_df = df.pivot_table(index=["user_name"], columns=["item_name"], values="rating")
    item_name_col = user_item_df[item_name]
    moveis_from_item_based = user_item_df.corrwith(item_name_col).sort_values(ascending=False)
    mask = moveis_from_item_based.index != item_name
    moveis_from_item_based = moveis_from_item_based[mask]
    return moveis_from_item_based[0:10].index.to_list()

# Hàm dự đoán xếp hạng
def predict_rating(random_user, df):
    # df = fetch_data_from_api(url)
    user_item_df = df.pivot_table(index=["user_name"], columns=["item_name"], values="rating")

    if random_user in user_item_df.index:
      random_user_df = user_item_df.loc[random_user]
      items_bought = random_user_df.index[random_user_df.notna()].tolist()
    else:
      items_bought = []
      
    # print("items_bought : ", items_bought)
    items_bought_df = user_item_df[items_bought] # only return items bought
    # print("item_bought_df : ", items_bought_df)
    # information on how many items each user bought in total:
    user_item_count = items_bought_df.T.notnull().sum()

    user_item_count = user_item_count.reset_index()
    user_item_count.columns = ["user_name","item_count"] # number of items, which random user bought, were bought by each user , max is random user
    # print("user_item_count : \n", user_item_count)
    # 12% of items bought by random user:
    perc = len(items_bought) * 12 / 100

    users_same_items = user_item_count[user_item_count["item_count"] > perc]["user_name"] # only calculate with users who bought more than 60% items together with random user
    # print("users_same_items :\n", users_same_items)
    final_df = items_bought_df[items_bought_df.index.isin(users_same_items)]
    # print("final_df : \n", final_df)
    # caculate corr between each pair users who bought more 60% items together with random user
    corr_df = final_df.T.corr().unstack().sort_values().drop_duplicates()
    corr_df = pd.DataFrame(corr_df, columns=["corr"])
    corr_df.index.names = ['user_1', 'user_2']
    corr_df = corr_df.reset_index()

    # print("corr_df : \n", corr_df)
    # Users with a correlation of %30 or more with random user:
    top_users = corr_df[(corr_df["user_1"] == random_user) & (corr_df["corr"] >= 0.3)][
        ["user_2", "corr"]].reset_index(drop=True) # correlation >= 40% with random user

    # print("top_users : \n", top_users)
    top_users = top_users.sort_values(by='corr', ascending=False) # corr between User and random user
    top_users.rename(columns={"user_2": "user_name"}, inplace=True)
    # print("top_users rename : \n", top_users)
    top_users_ratings = top_users.merge(df[["user_name", "item_name", "rating"]], how='inner')
    # print("top_users_ratings : \n", top_users_ratings)
    # create a dataframe that insert Items, Rating into top_users
    top_users_ratings = top_users_ratings[top_users_ratings["user_name"] != random_user]

    top_users_ratings['weighted_rating'] = top_users_ratings['corr'] * top_users_ratings['rating'] # một cột mới có trọng số_đánh giá = sửa * xếp hạng
    top_users_ratings.groupby('item_name').agg({"weighted_rating": "mean"}) # tính toán xếp hạng có trọng số mà người dùng ngẫu nhiên có thể xếp hạng cho các mục

    predict1 = pd.DataFrame(columns=['item_name', 'rating'])
    predict1['item_name'] = top_users_ratings['item_name']
    predict1['rating'] = top_users_ratings['weighted_rating'] 
    return predict1
    
# Hàm lọc cộng tác
def CollaborativeFiltering(item, user, df):
  recommendation_df = predict_rating(user, df)
  recommendation_df = recommendation_df.reset_index()

  # các mục mà người dùng ngẫu nhiên sẽ thích
  items_to_be_recommend = recommendation_df[recommendation_df["rating"] > 1].sort_values("rating", ascending=False)
 
  moveis_from_item_based = item_based(item, df)

  recommend_list = items_to_be_recommend[:10]['item_name'].to_list() + moveis_from_item_based
  recommend_list = list(set(recommend_list))[:4]
  recommend_list = sorted(recommend_list, key=lambda x: random.random())
  return recommend_list

# Hàm gợi ý chính
def recommend(item, user, df):
    return CollaborativeFiltering(item, user, df)


# import pandas as pd
# import numpy as np
# from sklearn.metrics.pairwise import cosine_similarity
# from scipy import sparse

# class CF(object):
#     """docstring for CF"""
#     def __init__(self, Y_data, k, dist_func=cosine_similarity, uuCF=1):
#         self.uuCF = uuCF  # user-user (1) hoặc item-item (0) CF
#         self.Y_data = Y_data if uuCF else Y_data[:, [1, 0, 2]]
#         self.k = k
#         self.dist_func = dist_func
#         self.Ybar_data = None
#         # số lượng users và items. Nhớ thêm 1 vì id bắt đầu từ 0
#         self.n_users = int(np.max(self.Y_data[:, 0])) + 1 
#         self.n_items = int(np.max(self.Y_data[:, 1])) + 1
    
#     def add(self, new_data):
#         """
#         Cập nhật ma trận Y_data khi có đánh giá mới.
#         Giả sử không có user hoặc item mới.
#         """
#         self.Y_data = np.concatenate((self.Y_data, new_data), axis=0)

#     def normalize_Y(self):
#         users = self.Y_data[:, 0] # all users - first col of the Y_data
#         self.Ybar_data = self.Y_data.copy()
#         self.mu = np.zeros((self.n_users,))
#         for n in range(self.n_users):
#             # row indices of rating done by user n
#             # since indices need to be integers, we need to convert
#             ids = np.where(users == n)[0].astype(np.int32)
#             # indices of all ratings associated with user n
#             item_ids = self.Y_data[ids, 1] 
#             # and the corresponding ratings 
#             ratings = self.Y_data[ids, 2]
#             # take mean
#             m = np.mean(ratings) 
#             if np.isnan(m):
#                 m = 0 # to avoid empty array and nan value
#             self.mu[n] = m
#             # normalize
#             self.Ybar_data[ids, 2] = ratings - self.mu[n]

#         ################################################
#         # form the rating matrix as a sparse matrix. Sparsity is important 
#         # for both memory and computing efficiency. For example, if #user = 1M, 
#         # #item = 100k, then shape of the rating matrix would be (100k, 1M), 
#         # you may not have enough memory to store this. Then, instead, we store 
#         # nonzeros only, and, of course, their locations.
#         self.Ybar = sparse.coo_matrix((self.Ybar_data[:, 2],
#             (self.Ybar_data[:, 1], self.Ybar_data[:, 0])), (self.n_items, self.n_users))
#         self.Ybar = self.Ybar.tocsr()

#     def similarity(self):
#         """tính similarity giữa user/item"""
#         self.S = self.dist_func(self.Ybar.T, self.Ybar.T)

#     def refresh(self):
#         """
#         Chuẩn hóa dữ liệu và tính lại ma trận similarity (sau khi
#         thêm một số đánh giá mới)
#         """
#         self.normalize_Y()
#         self.similarity() 

#     def fit(self):
#         self.refresh()

#     def __pred(self, u, i, normalized=1):
#         """ 
#         Dự đoán rating của user u cho item i (đã chuẩn hóa)
#         """
#         # Bước 1: tìm tất cả user đã đánh giá i
#         ids = np.where(self.Y_data[:, 1] == i)[0].astype(np.int32)
#         # Bước 2: 
#         users_rated_i = (self.Y_data[ids, 0]).astype(np.int32)
#         # Bước 3: tìm similarity giữa user hiện tại và các user khác 
#         # đã đánh giá i
#         sim = self.S[u, users_rated_i]
#         # Bước 4: tìm k user giống nhất
#         a = np.argsort(sim)[-self.k:] 
#         # và mức độ similarity tương ứng
#         nearest_s = sim[a]
#         # Cách mà mỗi user 'gần nhất' đã đánh giá item i
#         r = self.Ybar[i, users_rated_i[a]]
#         if normalized:
#             # thêm một số nhỏ, ví dụ, 1e-8, để tránh chia cho 0
#             return (r*nearest_s).sum() / (np.abs(nearest_s).sum() + 1e-8)

#         return (r*nearest_s).sum() / (np.abs(nearest_s).sum() + 1e-8) + self.mu[u]

#     def pred(self, u, i, normalized=1):
#         """ 
#         Dự đoán rating của user u cho item i (đã chuẩn hóa)
#         """
#         if self.uuCF: 
#             return self.__pred(u, i, normalized)
#         return self.__pred(i, u, normalized)

#     def recommend(self, u):
#         """
#         Xác định tất cả các items nên được recommend cho user u.
#         Quyết định dựa trên tất cả i như sau:
#         self.pred(u, i) > 0. Giả sử chúng ta đang xem xét các items mà user u chưa đánh giá. 
#         """
#         ids = np.where(self.Y_data[:, 0] == u)[0]
#         items_rated_by_u = self.Y_data[ids, 1].tolist()              
#         recommended_items = []
#         for i in range(self.n_items):
#             if i not in items_rated_by_u:
#                 rating = self.__pred(u, i)
#                 if rating > 0: 
#                     recommended_items.append(i)
        
#         return recommended_items 

#     # def print_recommendation(self):
#     #     """in ra danh sách recommend"""
#     #     print("Recommendation: ")
#     #     for u in range(self.n_users):
#     #         recommended_items = self.recommend(u)
#     #         if self.uuCF:
#     #             print("    Recommend item(s):", recommended_items, 'for user', u)
#     #         else: 
#     #             print("    Recommend item", u, "for user(s): ", recommended_items)


