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


