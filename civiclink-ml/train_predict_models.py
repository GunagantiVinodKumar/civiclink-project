import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import pickle
import os

# Load dataset
df = pd.read_csv("data/synthetic_issues.csv")

# Train category prediction model
category_model = make_pipeline(
    TfidfVectorizer(), MultinomialNB()
)
category_model.fit(df["description"], df["category"])

# Train title prediction (simple vector similarity fallback)
title_model = dict(zip(df["description"], df["title"]))

# Save models
os.makedirs("models", exist_ok=True)
with open("models/category_model.pkl", "wb") as f:
    pickle.dump(category_model, f)
with open("models/title_model.pkl", "wb") as f:
    pickle.dump(title_model, f)