"""
Performs file operations including opening, saving, creating zip files, etc.
"""

import tempfile
import zipfile
import mido


def open_midi(input_file_or_path):
    """
    Opens the midi file for manipulation.
    """

    return mido.MidiFile(file=input_file_or_path)

def create_tempfile(midi_file):
    """
    Stores a MIDI file in memory in the format necessary for return to the frontend.
    """

    temporary_file = tempfile.TemporaryFile()
    midi_file.save(file = temporary_file)
    temporary_file.seek(0)

    return temporary_file

def add_filename_suffix(original_filename, insertion_string):
    """
    Inserts a string into the filename before the file extension.
    """

    parts = original_filename.rsplit('.', 1)
    new_filename = parts[0] + insertion_string + '.' + parts[1]

    return new_filename

def create_zip():
    """
    Creates a zip file in memory that files may be written to.
    """

    response_file = tempfile.NamedTemporaryFile(delete=False)

    return zipfile.ZipFile(response_file, mode='w'), response_file.name

def get_file_size(file):
    """
    Returns the size of a file.
    """

    # Move the cursor to the end of the file
    file.stream.seek(0, 2)

    # Get the current position of the cursor, which is the file size
    file_size = file.stream.tell()

    # Reset the cursor to the beginning of the file
    file.stream.seek(0)

    return file_size
