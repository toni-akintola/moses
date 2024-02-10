import os
from flask import Flask, request, jsonify, render_template
from flask_weasyprint import render_pdf
from weasyprint import HTML

app = Flask(__name__)

countries = [
    {"id": 1, "name": "Thailand", "capital": "Bangkok", "area": 513120},
    {"id": 2, "name": "Australia", "capital": "Canberra", "area": 7617930},
    {"id": 3, "name": "Egypt", "capital": "Cairo", "area": 1010408},
]


# def translate(string):
#     client = OpenAI()

#     completion = client.chat.completions.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are helping international migrants translate their resumes into English."},
#             {"role": "user", "content": f"Translate the following: {string}"}
#         ]
#     )
#     return (completion.choices[0].message.content)


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers',
                       'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods',
                       'GET,PUT,POST,DELETE,OPTIONS')
  return response


@app.get("/countries")
def get_countries():
    return jsonify(countries)


@app.route("/build_resume", methods=["POST", "GET"])
def build_resume():
    data = request.get_json()
    print(data)
    html = render_template('index.html', data=data)
    pdf = render_pdf(HTML(string=html), stylesheets=[
                     "/Users/Toni/The Vault/moses/flask/static/style.css", "/Users/Toni/The Vault/moses/flask/static/normalize.css", "/Users/Toni/The Vault/moses/flask/static/solid.css"])
    return pdf


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
