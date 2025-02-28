"""
The primary function of this module. Takes a midi file, inverts all the notes and pitch bends,
and returns the inverted version.
"""

from .track_adjustments import invert_notes_and_pitch_bends, adjust_track_octaves
from .get_octave_adjustments import get_octave_adjustments


def invert_midi(original_mid, skip_track_ten=False):
    """
    Takes a midi file, inverts all the notes and pitch bends, and returns the inverted version.

    If the midi file has no notes, this just returns the original midi file.
    """

    octaves_to_adjust_tracks = get_octave_adjustments(
        original_mid, skip_track_ten)

    if not octaves_to_adjust_tracks:
        return original_mid

    inverted_mid = invert_notes_and_pitch_bends(original_mid, skip_track_ten)

    octave_adjusted_inverted_mid = adjust_track_octaves(
        inverted_mid, octaves_to_adjust_tracks, skip_track_ten)

    return octave_adjusted_inverted_mid
