import os
from flask import url_for

def react_uri():
    env = os.environ.get("FLASK_ENV")

    if env == "production":
        return url_for('static', filename='js/main.js')
    elif env == "development":
        return "http://localhost:8080/static/main.js"