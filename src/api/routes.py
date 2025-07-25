from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)


CORS(api, origins="*", supports_credentials=True)

@api.route('/hello', methods=['GET', 'POST'])
def handle_hello():
    response_body = { "message": "Hello! I'm the backend." }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email", None)
    password = data.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user_exist = User.query.filter_by(email=email).first()
    if user_exist:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email", None)
    password = data.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Bad credentials"}), 401

    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({ "token": access_token }), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({ "msg": "User not found" }), 404

    return jsonify({ "msg": f"Welcome {user.email}, this is a private route." }), 200
