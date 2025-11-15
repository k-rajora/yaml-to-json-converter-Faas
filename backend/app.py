from flask import Flask, request, jsonify
from flask_cors import CORS
from converter import yaml_to_json, json_to_yaml

app = Flask(__name__)
CORS(app)

@app.route("/convert/y2j", methods=["POST"])
def convert_yaml_to_json():
    body = request.json.get("content", "")
    result = yaml_to_json(body)
    return jsonify({"converted": result})

@app.route("/convert/j2y", methods=["POST"])
def convert_json_to_yaml():
    body = request.json.get("content", "")
    result = json_to_yaml(body)
    return jsonify({"converted": result})

@app.route("/")
def home():
    return "YAML ↔ JSON Converter Backend Running!"

if __name__ == "__main__":
    app.run(port=5000, debug=True)
