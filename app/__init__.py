__version__ = '0.1.0'

from flask import Flask, render_template

from app.config import Config
from app.helpers import react_uri

from app.routes.base import base

def create_app():
    # App init
    app = Flask(__name__)
    app.config.from_object(Config)

    # Asset Setup
    app.register_blueprint(base)

    @app.context_processor
    def inject_react_url():
        with app.app_context(), app.test_request_context():
            return dict(react_uri=react_uri())

    # Misc
    @app.errorhandler(404)
    def not_found(e):
        return render_template('index.html')

    return app