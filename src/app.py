import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from dotenv import load_dotenv

# Carga el .env manualmente desde el directorio actual
load_dotenv(dotenv_path="../.env")
print("DB URI cargada:", os.getenv("SQLALCHEMY_DATABASE_URI"))

from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

app = Flask(__name__)

# Configuración general
ENV = os.getenv("FLASK_DEBUG", "production")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../dist/')
app.url_map.strict_slashes = False

# CORS para permitir peticiones desde el frontend
CORS(app)

# Configuración de la base de datos
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Inicialización de extensiones
db.init_app(app)
Migrate(app, db)

# Registro de rutas, admin y comandos personalizados
setup_admin(app)
setup_commands(app)
app.register_blueprint(api, url_prefix='/api')

# Sitemap para desarrollo
@app.route('/')
def sitemap():
    return generate_sitemap(app)
