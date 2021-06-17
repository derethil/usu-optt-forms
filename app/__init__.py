__version__ = '0.1.0'

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from app.config import Config
from app.helpers import react_uri

db = SQLAlchemy()
migrate = Migrate()

from app.models import User
from app.routes.base import base

def create_app():
    # App init
    app = Flask(__name__)
    app.config.from_object(Config)

    # Extension Setup
    db.init_app(app)
    migrate.init_app(app, db)

    # Asset Setup
    app.register_blueprint(base)

    # Contexts
    @app.shell_context_processor
    def make_shell_context():
        return {"db": db, "User": User}

    @app.context_processor
    def inject_react_url():
        with app.app_context(), app.test_request_context():
            return dict(react_uri=react_uri())

    # Misc
    @app.errorhandler(404)
    def not_found(e):
        return render_template('index.html')

    return app