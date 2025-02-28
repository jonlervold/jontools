"""
Houses basic functions that are used across the module by the more advanced functions.
"""

from .constants import TOTAL_NOTES_IN_AN_OCTAVE


def map_note_to_octave(input_value):
    """
    Maps the central note of a track to what octave that track falls into.
    """

    if 0 <= input_value <= 11:
        return 0
    elif 12 <= input_value <= 23:
        return 1
    elif 24 <= input_value <= 35:
        return 2
    elif 36 <= input_value <= 47:
        return 3
    elif 48 <= input_value <= 59:
        return 4
    elif 60 <= input_value <= 71:
        return 5
    elif 72 <= input_value <= 83:
        return 6
    elif 84 <= input_value <= 95:
        return 7
    elif 96 <= input_value <= 107:
        return 8
    elif 108 <= input_value <= 119:
        return 9
    elif 120 <= input_value <= 127:
        return 10


def raise_note_by_octaves(note, octaves_to_raise):
    """
    Changes the pitch of a given note. If octaves_to_raise is negative, it will lower the pitch
    instead.
    """

    return note + TOTAL_NOTES_IN_AN_OCTAVE * octaves_to_raise


def invert_note(note):
    """
    Changes a note to its inverted version (across the axis of note 64).
    """

    return 127 - note


def calculate_average(numbers):
    """"
    Gets the average of a set of notes, rounded to the nearest integer.
    """

    return round(sum(numbers) / len(numbers))


def check_note_range_okay(notes):
    """
    Examines a set of notes, returns true if none are out of range. Returns false if any are out
    of range.
    """

    return not any(note > 127 or note < 0 for note in notes)
