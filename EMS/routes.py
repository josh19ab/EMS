from flask import Blueprint, request, jsonify
from EMS import db
from EMS.models import Employee
from flask_jwt_extended import jwt_required

api_bp = Blueprint('api', __name__)

@api_bp.route('/employees', methods=['POST'])
@jwt_required()
def create_employee():
    data = request.get_json()
    email = data.get('email')
    existing_employee = Employee.query.filter_by(email=email).first()
    if existing_employee:
        return jsonify({'email': ['Employee with this email already exists.']}), 400
    new_employee = Employee(**data)
    db.session.add(new_employee)
    db.session.commit()
    return jsonify(new_employee.serialize()), 201

@api_bp.route('/employees', methods=['GET'])
@jwt_required()
def get_employees():
    employees = Employee.query.all()
    return jsonify([e.serialize() for e in employees])

@api_bp.route('/employees/<int:id>', methods=['GET'])
@jwt_required()
def get_employee(id):
    employee = Employee.query.get_or_404(id)
    return jsonify(employee.serialize())

@api_bp.route('/employees/<int:id>', methods=['PUT'])
@jwt_required()
def update_employee(id):
    data = request.get_json()
    employee = Employee.query.get_or_404(id)
    for key, value in data.items():
        setattr(employee, key, value)
    db.session.commit()
    return jsonify(employee.serialize())

@api_bp.route('/employees/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_employee(id):
    employee = Employee.query.get_or_404(id)
    db.session.delete(employee)
    db.session.commit()
    return jsonify({'message': 'Employee deleted'}), 204


@api_bp.route('/employees/count', methods=['GET'])
@jwt_required()
def get_employee_count():
    count = Employee.query.count()
    return jsonify({'count': count})