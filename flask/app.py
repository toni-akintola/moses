from api2pdf import Api2Pdf
from flask import Flask, request, jsonify
import numpy as np
import os
# importing from a pylatex module
from pylatex import Document, Section, Subsection, Tabular
from pylatex import Math, TikZ, Axis, Plot, Figure, Matrix, Alignat
from pylatex.utils import italic


app = Flask(__name__)

countries = [
    {"id": 1, "name": "Thailand", "capital": "Bangkok", "area": 513120},
    {"id": 2, "name": "Australia", "capital": "Canberra", "area": 7617930},
    {"id": 3, "name": "Egypt", "capital": "Cairo", "area": 1010408},
]


@app.get("/countries")
def get_countries():
    return jsonify(countries)


@app.route("/resume", methods=['GET', 'POST'])
def build_resume():
    a2p_client = Api2Pdf(os.environ["API_2_PDF_KEY"])

    api_response = a2p_client.Chrome.html_to_pdf('<p>Hello, World</p>')
    return (api_response.result)
