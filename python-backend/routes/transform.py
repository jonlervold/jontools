"""
Route for the transform page.
Transforms the notes of MIDI files based on user selections.
"""

import json

from flask import Blueprint, request, send_file, jsonify

from file_operations_svc import create_zip, open_midi, create_tempfile, add_filename_suffix, \
    get_file_size
from midi_transformation_svc import transform_midi, is_transformation_map_valid

from .constants import MAX_MIDI_FILE_SIZE, MAX_MIDI_FILE_COUNT

def transform_single_file(midi_file, transformation_map, remove_pitch_bends, skip_track_ten):
    """
    Transforms a single MIDI file based on user selections.
    """

    original_midi = open_midi(midi_file)
    inverted_midi = transform_midi(
        original_midi,
        transformation_map,
        remove_pitch_bends,
        skip_track_ten
    )
    outfile = create_tempfile(inverted_midi)
    return_filename = add_filename_suffix(midi_file.filename, ' - Transformed')

    return outfile, return_filename


def handle_single_file(files, transformation_map, remove_pitch_bends, skip_track_ten):
    """
    Handles a single file submission.
    """
    try:
        outfile, return_filename = transform_single_file(
            files[0], transformation_map, remove_pitch_bends, skip_track_ten)
    except IOError:
        # If the file fails to convert, return 400
        return jsonify({"error": "The selected file may not be a valid MIDI file, or it may \
                        contain notes that are out of range."}), 400

    # On success, return inverted MIDI file
    response = send_file(
        outfile,
        mimetype="audio/midi",
        as_attachment=True,
        download_name=return_filename
    )
    response.headers["X-Failures-Description"] = ""
    response.headers["X-Filename"] = return_filename
    response.headers["X-Failures"] = json.dumps([])
    response.headers["Access-Control-Expose-Headers"] = "X-Failures-Description, X-Filename, \
        X-Failures"

    return response


def handle_multiple_files(files, transformation_map, remove_pitch_bends, skip_track_ten):
    """
    Handles multiple file submissions.
    """
    zip_file, temp_filename = create_zip()

    failures = []
    for file in files:
        try:
            outfile, return_filename = transform_single_file(
                file, transformation_map, remove_pitch_bends, skip_track_ten)
            zip_file.writestr(return_filename, outfile.read())
        except IOError:
            failures.append(file.filename)

    zip_file.close()

    # In the event that all files fail, return 400
    if len(failures) == len(files):
        return jsonify({"error": "Failed to invert all files. These may not be valid MIDI \
                        files, or they may contain notes that are out of range."}), 400

    # Otherwise, return the Zip of all successful files
    #   and include any failing filenames in the X-Failures header
    response = send_file(
        temp_filename,
        mimetype="zip",
        as_attachment=True,
        download_name='transformed_midi_files.zip'
    )
    response.headers["X-Filename"] = "transformed_midi_files.zip"
    response.headers["X-Failures"] = json.dumps(failures)
    response.headers["X-Failures-Description"] = "" if not failures else "These files failed \
        to convert and were not included in the zip. They may not be valid MIDI files, or \
        they may contain notes that are out of range."
    response.headers["Access-Control-Expose-Headers"] = "X-Failures-Description, X-Filename, \
        X-Failures"

    return response


transform_bp = Blueprint('transform', __name__)


@transform_bp.route('/transform', methods=['POST'])
def transform():
    """
    Route that handles the submission of MIDI files to be transformed.
    Valid transformation map structure contains these keys with values from -11 to 11.
    {
        "C": 0,
        "C#/Db": 0,
        "D": 0,
        "D#/Eb": 0,
        "E": 0,
        "F": 0,
        "F#/Gb": 0,
        "G": 0,
        "G#/Ab": 0,
        "A": 0,
        "A#/Bb": 0,
        "B": 0
    }
    """

    files = request.files.getlist('midi_file')

    # Ensure the number of files is within the limit
    if len(files) > MAX_MIDI_FILE_COUNT:
        return jsonify(
            {"error": f"Too many files. The maximum number of files is {MAX_MIDI_FILE_COUNT}."}
        ), 400

    # Ensure file sizes are within the limit
    for file in files:
        file_size = get_file_size(file)

        if file_size > MAX_MIDI_FILE_SIZE:
            return jsonify(
                {"error": f"File {file.filename} exceeds the maximum allowed size of 1 MB."}
            ), 400

    # Ensure all necessary properties are present and valid

    try:
        transformation_map = json.loads(request.form.get('transformation_map'))
    except TypeError:
        return jsonify({"error": "Missing transformation map instruction"}), 400
    except json.JSONDecodeError:
        return jsonify({"error": "Malformed JSON in transformation map"}), 400
    if not is_transformation_map_valid(transformation_map):
        return jsonify({"error": "Transformation map data is invalid"}), 400

    try:
        remove_pitch_bends = bool(int(request.form.get('remove_pitch_bends')))
    except TypeError:
        return jsonify({"error": "Missing remove pitch bends instruction"}), 400

    try:
        skip_track_ten = bool(int(request.form.get('skip_track_ten')))
    except TypeError:
        return jsonify({"error": "Missing skip track ten instruction"}), 400

    # User submits one file
    if len(files) == 1:
        return handle_single_file(files, transformation_map, remove_pitch_bends, skip_track_ten)

    # User submits multiple files
    if len(files) > 1:
        return handle_multiple_files(files, transformation_map, remove_pitch_bends, skip_track_ten)

    # User submits no files, return 400
    return jsonify({"error": "No files provided"}), 400
