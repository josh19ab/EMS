from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employees.db'
    app.config['JWT_SECRET_KEY'] = 'abc123'
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from EMS.models import Employee, User  # Ensure models are imported
    from EMS.routes import api_bp
    from EMS.auth import auth_bp

    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    @app.route('/')
    def home():
        return jsonify(message="Welcome to the Employee Management System API")

    return app
