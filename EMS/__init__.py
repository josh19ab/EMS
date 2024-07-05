from .extensions import db, migrate, jwt, cors
from .models import Employee, User
from .routes import api_bp
from .auth import auth_bp