import json
import flask

from flask import request

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
 return render_template('mapa.html')