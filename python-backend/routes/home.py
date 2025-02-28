"""
Route for the home page. Returns a simple message indicating that the API is operational.
"""

from flask import Blueprint

home_bp = Blueprint('home', __name__)

@home_bp.route('/')
def home():
    """
    Returns a simple message indicating that the API is operational.
    """

    return "jontools Python API Operational"
