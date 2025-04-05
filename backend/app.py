# import os
# from flask import Flask, request, jsonify, render_template
# import google.generativeai as genai
# from flask_cors import CORS


# # 🔑 Paste your Gemini API key here
# GEMINI_API_KEY = "AIzaSyDBr79QdHJSexEPfDGpVmqDz3dhFZkCgmU"

# # Configure Gemini
# genai.configure(api_key=GEMINI_API_KEY)
# model = genai.GenerativeModel('models/gemini-1.5-pro-latest')

# app = Flask(__name__)
# CORS(app)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     user_input = data.get("text", "")
    
#     # 🧠 Updated Prompt with Reason
#     prompt = f"""
# You are a fake news detection assistant.

# Analyze the following news and respond in this format:

# Verdict: Real or Fake  
# Reason: (brief explanation of your decision)

# News: \"{user_input}\"
# """

#     try:
#         response = model.generate_content(prompt)
#         answer = response.text.strip()

#         # Default values
#         label = "Uncertain"
#         reason = "No explanation provided."

#         # 🔍 Parse Gemini's output
#         if "verdict:" in answer.lower():
#             lines = answer.splitlines()
#             for line in lines:
#                 if "verdict" in line.lower():
#                     if "fake" in line.lower():
#                         label = "Fake"
#                     elif "real" in line.lower():
#                         label = "Real"
#                 elif "reason" in line.lower():
#                     reason = line.split(":", 1)[-1].strip()

#         return jsonify({'label': label, 'reason': reason})

#     except Exception as e:
#         return jsonify({'label': 'Error', 'reason': str(e)})

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # ✅ Enables frontend access

# Gemini API Config
genai.configure(api_key="AIzaSyDBr79QdHJSexEPfDGpVmqDz3dhFZkCgmU")
model = genai.GenerativeModel('models/gemini-1.5-pro-latest')


@app.route('/')
def index():
    return jsonify({'message': 'Faktify API is running! 🚀'})


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    user_input = data.get("text", "")

    prompt = f"""
You are a fake news detection assistant.

Analyze the following news and respond in this format:

Verdict: Real or Fake  
Reason: (brief explanation of your decision)

News: \"{user_input}\"
"""

    try:
        response = model.generate_content(prompt)
        answer = response.text.strip()

        label = "Uncertain"
        reason = "No explanation provided."

        if "verdict:" in answer.lower():
            lines = answer.splitlines()
            for line in lines:
                if "verdict" in line.lower():
                    if "fake" in line.lower():
                        label = "Fake"
                    elif "real" in line.lower():
                        label = "Real"
                elif "reason" in line.lower():
                    reason = line.split(":", 1)[-1].strip()

        return jsonify({'label': label, 'reason': reason})

    except Exception as e:
        print("Error:", e)
        return jsonify({'label': 'Error', 'reason': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
