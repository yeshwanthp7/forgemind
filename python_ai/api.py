from flask import Flask, request, jsonify
from main import analyze_incident

app = Flask(__name__)

@app.route("/")
def home():
    return "ForgeMind AI API is running"

@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json 

    result = analyze_incident(data)

    return jsonify(result)

import os

if __name__ == "__main__":
    port = int(os.getenv("PYTHON_PORT", 5001))
    app.run(port=port, debug=True)