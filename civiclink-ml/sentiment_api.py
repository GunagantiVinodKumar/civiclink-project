from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

@app.route("/sentiment", methods=["POST"])
def analyze_sentiment():
    data = request.get_json()
    feedback = data.get("feedback", "")

    analysis = TextBlob(feedback)
    polarity = analysis.sentiment.polarity

    if polarity > 0.1:
        sentiment = "positive"
    elif polarity < -0.1:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    return jsonify({
        "sentiment": sentiment,
        "score": polarity
    })

if __name__ == "__main__":
    app.run(port=5001)
