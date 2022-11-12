import json
import flask
import ee
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from datetime import date
import PIL
from PIL import Image
import numpy as np

from flask import request

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
 return render_template('mapa.html')

if __name__ =='__main__':
    app.run(debug = True)