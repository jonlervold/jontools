"""
Houses functions necessary for determining how many octaves each track should be adjusted.
"""

from .constants import MESSAGE_TYPE_NOTE_TOGGLES, MAX_TRANSPOSITION_ATTEMPTS

from .base_utils import invert_note, calculate_average, map_note_to_octave, \
    raise_note_by_octaves, check_note_range_okay


def extract_notes_into_sets(original_mid, skip_track_ten):
    """
    Takes the original MIDI track and:
        - Extracts every note in the whole composition into a set.
        - Creates a dictionary of track_number -> set of notes present on that track for the
            original tracks.
        - Creates a dictionary of track_number -> set of notes present on that track for the
            inverted tracks.
    """

    all_notes = []
    all_notes_per_track = {}
    all_notes_per_track_inverted = {}

    for track_number, track in enumerate(original_mid.tracks):
        all_notes_per_track[track_number] = []
        all_notes_per_track_inverted[track_number] = []

        for message in track:
            if message.type in MESSAGE_TYPE_NOTE_TOGGLES:
                # message channel nine indicates what is usually referred to as "track ten"
                if skip_track_ten and message.channel == 9:
                    break

                all_notes.append(message.note)
                all_notes_per_track[track_number].append(message.note)
                all_notes_per_track_inverted[track_number].append(
                    invert_note(message.note))

        all_notes_per_track[track_number] = set(
            all_notes_per_track[track_number])

        all_notes_per_track_inverted[track_number] = set(
            all_notes_per_track_inverted[track_number])

    all_notes = set(all_notes)

    return all_notes, all_notes_per_track, all_notes_per_track_inverted


def ensure_valid_transposition(notes, octaves_to_raise):
    """
    It is possible that transposition may result in out-of-range notes (i.e. < 0, > 127).
    This function prevents this. It examines the track, and applies the initial octave adjustment.
    If this produces out-of-range notes, it changes the transposition amount by one octave closer
    to the original and tries again. This process repeats until no out-of-range notes are produced.
    """

    attempts = 0
    transposition_okay = False

    while not transposition_okay and attempts < MAX_TRANSPOSITION_ATTEMPTS:
        transposition_result = {raise_note_by_octaves(
            note, octaves_to_raise) for note in notes}
        transposition_okay = check_note_range_okay(transposition_result)

        if not transposition_okay:
            if octaves_to_raise > 0:
                octaves_to_raise -= 1
            else:
                octaves_to_raise += 1

        attempts += 1

    if not transposition_okay:
        raise ValueError(
            "Unable to find a valid transposition within the allowed attempts.")

    return octaves_to_raise


def get_octave_adjustments(original_mid, skip_track_ten):
    """
    Determines how each track's octave should shift to match the original track's pitch range.
    Returns a dictionary with keys being track numbers, and values being the amount of octaves
    to RAISE the pitch (i.e. negative values mean lower the pitch).

    Returns None if there are no notes in the MIDI file.
    """

    all_notes, all_notes_per_track, all_notes_per_track_inverted = extract_notes_into_sets(
        original_mid, skip_track_ten)

    if len(all_notes) == 0:
        return None

    octaves_to_adjust_tracks = {}

    for track_number in range(len(original_mid.tracks)):
        if len(all_notes_per_track[track_number]) == 0:
            octaves_to_adjust_tracks[track_number] = 0
            continue

        original_octave = map_note_to_octave(
            calculate_average(all_notes_per_track[track_number]))

        flipped_octave = map_note_to_octave(
            calculate_average(all_notes_per_track_inverted[track_number]))

        octaves_to_raise = original_octave - flipped_octave

        octaves_to_adjust_tracks[track_number] = ensure_valid_transposition(
            all_notes_per_track_inverted[track_number],
            octaves_to_raise)

    return octaves_to_adjust_tracks
