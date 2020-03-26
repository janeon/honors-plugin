import pandas as pd
import sys
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import metrics
import numpy as np
# https://www.datacamp.com/community/tutorials/understanding-logistic-regression-python
# features: code snippet presence, attempts, and length
# target: acceptance
accepted, not_accepted = sys.argv[1], sys.argv[2]
accepted = pd.read_csv(accepted)
not_accepted= pd.read_csv(not_accepted)

# dropping extraneous columns
cols_to_drop = ['scTovc', 'ViewCount', 'Score', 'Post Link']
accepted.drop(columns=cols_to_drop, inplace=True)
not_accepted.drop(columns=cols_to_drop, inplace=True)

# merging the two types of question posts into a single dataframe
data = accepted.merge(not_accepted, how='outer').set_index('Id')

# dropping rows for testing purposes
# rows_to_drop = range(0, 495, 1)
# data = data.drop(rows_to_drop)

# adding target column values
# print("sizes")
# print(accepted.shape[0])
aa = []
for i, row in data.iterrows():
    aa.append(pd.notnull(row[1]))
data['aa'] = aa

# adding feature columns
attempt_signifying_words = ["attempt", "try", "tried", "tries"]
code_presence = []
length = []
attempt_presence = []
for i, row in data.iterrows():
    code_presence.append("<code>" in row[0])
    length.append(len(row[0]) > 1350)
    attempt = 0
    for word in attempt_signifying_words:
        if word in row[0]:
            attempt = 1
            break
    attempt_presence.append(attempt)

# print(j) # note here that the sample of questions without code snippets is disproportionately low
data['code'], data['length'], data['attempts'] = code_presence, length, attempt_presence
feature_cols = ['code', 'length', 'attempts'] # affect ranking: code, attempts, length
data.drop(columns=['Body', 'AcceptedAnswerId', 'Title'], inplace=True)
print(data.head)
X = data[feature_cols] # Features
y = data.aa # Target variable
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.25,random_state=0)

logreg = LogisticRegression()
logreg.fit(X_train,y_train)
y_pred=logreg.predict(X_test)
cnf_matrix = metrics.confusion_matrix(y_test, y_pred)

print(cnf_matrix)
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
print("Precision:",metrics.precision_score(y_test, y_pred))
print("Recall:",metrics.recall_score(y_test, y_pred))
c = logreg.coef_[0]

# https://stackoverflow.com/questions/47303261/getting-weights-of-features-using-scikit-learn-logistic-regression
predicted_values = {}
feature_possibilities = ["000", "001", "010", "100", "011", "110", "101", "111"]
for option in feature_possibilities:
    x = [ int(char) for char in option ]
    z = x @ c.T
    y = 1/(1 + np.exp(-z))
    predicted_values[option] = y

print(predicted_values)
