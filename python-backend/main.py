"""
Main module for the Python backend.
"""

from flask import Flask
from flask_cors import CORS
from routes import blueprints

app = Flask(__name__)

# Python backend is only accessible via the Docker network, so no need to restrict origins
CORS(
    app,
    # Allow these response headers to be exposed to the frontend:
    expose_headers=["X-Filename", "X-Failures", "X-Failures-Description"]
)

# Register all routes:
for blueprint in blueprints:
    app.register_blueprint(blueprint)

# Run the Flask application
if __name__ == "__main__":
    app.run()
