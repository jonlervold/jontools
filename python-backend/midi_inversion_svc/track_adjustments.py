"""
Houses functions that change individual notes within the midi file.
"""

from .constants import MESSAGE_TYPE_NOTE_TOGGLES, MESSAGE_TYPE_PITCHWHEEL

from .base_utils import invert_note, raise_note_by_octaves


def invert_notes_and_pitch_bends(mid, skip_track_ten):
    """
    Takes the midi file and performs the actual note inversion to the file.
    """

    for track in mid.tracks:
        for message in track:
            # message channel nine indicates what is usually referred to as "track ten"
            if (
                (message.type in MESSAGE_TYPE_NOTE_TOGGLES or message.type ==
                 MESSAGE_TYPE_PITCHWHEEL)
                and skip_track_ten
                and message.channel == 9
            ):
                break

            if message.type in MESSAGE_TYPE_NOTE_TOGGLES:
                message.note = invert_note(message.note)

            if message.type == MESSAGE_TYPE_PITCHWHEEL:
                # pitchwheel goes between -8192 and 8191, must account for -8192 flip possibility
                if message.pitch == -8192:
                    message.pitch = 8191
                else:
                    message.pitch = message.pitch * -1

    return mid


def adjust_track_octaves(mid, octaves_to_adjust_tracks, skip_track_ten):
    """
    Takes the midi and the map with keys of tracks and values of octaves to raise,
    then applies the map's changes.
    """

    for track_number, track in enumerate(mid.tracks):
        octaves_to_raise_this_track = octaves_to_adjust_tracks[track_number]

        if octaves_to_raise_this_track == 0:
            continue

        for message in track:
            if message.type in MESSAGE_TYPE_NOTE_TOGGLES:
                # message channel nine indicates what is usually referred to as "track ten"
                if skip_track_ten and message.channel == 9:
                    break

                message.note = raise_note_by_octaves(
                    message.note, octaves_to_raise_this_track)

    return mid
