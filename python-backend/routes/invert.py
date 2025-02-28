"""
Route for the invert page.
Inverts the pitches of MIDI files while preserving the overall register of each track.
"""
import json

from flask import Blueprint, request, send_file, jsonify

from file_operations_svc import create_zip, open_midi, create_tempfile, add_filename_suffix, \
    get_file_size
from midi_inversion_svc import invert_midi

from .constants import MAX_MIDI_FILE_SIZE, MAX_MIDI_FILE_COUNT


def invert_single_file(midi_file, skip_track_ten):
    """
    Inverts the pitches of a single MIDI file while preserving the overall register of each track.
    """

    original_midi = open_midi(midi_file)
    inverted_midi = invert_midi(original_midi, skip_track_ten)
    outfile = create_tempfile(inverted_midi)
    return_filename = add_filename_suffix(midi_file.filename, ' - Inverted')

    return outfile, return_filename


def handle_single_file(files, skip_track_ten):
    """
    Handles a single file submission.
    """
    try:
        outfile, return_filename = invert_single_file(
            files[0], skip_track_ten)
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


def handle_multiple_files(files, skip_track_ten):
    """
    Handles multiple file submissions.
    """
    zip_file, temp_filename = create_zip()

    failures = []
    for file in files:
        try:
            outfile, return_filename = invert_single_file(
                file, skip_track_ten)
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
        download_name="inverted_midi_files.zip"
    )
    response.headers["X-Filename"] = "inverted_midi_files.zip"
    response.headers["X-Failures"] = json.dumps(failures)
    response.headers["X-Failures-Description"] = "" if not failures else "These files failed \
        to convert and were not included in the zip. They may not be valid MIDI files, or \
        they may contain notes that are out of range."
    response.headers["Access-Control-Expose-Headers"] = "X-Failures-Description, X-Filename, \
        X-Failures"

    return response


invert_bp = Blueprint('invert', __name__)

@invert_bp.route('/invert', methods=['POST'])
def invert():
    """
    Route that handles the submission of MIDI files to be inverted.
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
        skip_track_ten = bool(int(request.form.get('skip_track_ten')))
    except TypeError:
        return jsonify({"error": "The skip track ten instruction is missing."}), 400

    # User submits one file
    if len(files) == 1:
        return handle_single_file(files, skip_track_ten)

    # User submits multiple files
    if len(files) > 1:
        return handle_multiple_files(files, skip_track_ten)

    # User submits no files, return 400
    return jsonify({"error": "No files were provided."}), 400
