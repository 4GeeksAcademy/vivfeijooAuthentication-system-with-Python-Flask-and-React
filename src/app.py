from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from api.routes import api
from api.models import db

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "any key works"

db.init_app(app)
Migrate(app, db)
JWTManager(app)
CORS(app)

app.register_blueprint(api, url_prefix="/api")

@app.route('/')
def main():
    return "API funcionando correctamente"
