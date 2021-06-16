__version__ = '0.1.0'

from flask import Flask, render_template

from app.routes.base import base

def create_app():
    app = Flask(__name__)

    app.register_blueprint(base)

    @app.errorhandler(404)
    def not_found(e):
        return render_template('index.html')

    return app