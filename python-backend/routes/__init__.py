"""
Routes for the Python backend.
"""

from .home import home_bp
from .invert import invert_bp
from .transform import transform_bp

blueprints = [home_bp, invert_bp, transform_bp]
