from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound
base = Blueprint("base", __name__)

@base.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@base.route("/test", methods=["GET"])
def test():
    return "Hello!"