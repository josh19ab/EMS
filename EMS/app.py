import os
from flask import Flask, jsonify

from EMS import db, migrate, jwt, cors
from EMS.models import Employee, User
from EMS.routes import api_bp
from EMS.auth import auth_bp

def create_app(config_object=None):
    app = Flask(__name__)

    if config_object:
        app.config.from_object(config_object)
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///employees.db'
        app.config['JWT_SECRET_KEY'] = 'abc123'
        cors.init_app(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    @app.route('/')
    def home():
        return jsonify(message="Welcome to the Employee Management System API")

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)