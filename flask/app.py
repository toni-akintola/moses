import os
from flask import Flask, request, jsonify, render_template, Response
import numpy as np
from xhtml2pdf import pisa


app = Flask(__name__)

countries = [
    {"id": 1, "name": "Thailand", "capital": "Bangkok", "area": 513120},
    {"id": 2, "name": "Australia", "capital": "Canberra", "area": 7617930},
    {"id": 3, "name": "Egypt", "capital": "Cairo", "area": 1010408},
]


@app.get("/countries")
def get_countries():
    return jsonify(countries)


@app.get("/pdf")
def build_resume():
  options = {
      "orientation": "landscape",
      "page-size": "A4",
      "margin-top": "1.0cm",
      "margin-right": "1.0cm",
      "margin-bottom": "1.0cm",
      "margin-left": "1.0cm",
      "encoding": "UTF-8",
  }
  template = render_template("index.html")

  filename = "MyTest.pdf"
  pisa_status = pisa.CreatePDF(template)
  if pisa_status.err:
      return Response(f'We had some errors')

  return Response(pisa_status, mimetype="application/pdf")


@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers',
                       'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods',
                       'GET,PUT,POST,DELETE,OPTIONS')
  return response


@app.route("/test", methods=["POST"])
def test():

    if request.method == "POST":
      data = request.get_json()
      print(data)
      return jsonify(data)


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
