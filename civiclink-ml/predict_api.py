from flask import Flask, request, jsonify
import pickle
import difflib

app = Flask(__name__)

# Load models
with open("models/category_model.pkl", "rb") as f:
    category_model = pickle.load(f)
with open("models/title_model.pkl", "rb") as f:
    title_model = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    description = data.get("description", "")

    # Predict category
    category = category_model.predict([description])[0]

    # Predict title using fuzzy matching
    best_match = difflib.get_close_matches(description, title_model.keys(), n=1)
    title = title_model[best_match[0]] if best_match else "Issue reported"

    return jsonify({"category": category, "title": title})

if __name__ == "__main__":
    app.run(port=5001)