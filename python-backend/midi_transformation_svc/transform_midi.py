"""
The primary function of this module. Takes a midi file, transforms it according to the supplied map,
and returns the transformed midi.
"""

from .constants import MESSAGE_TYPE_NOTE_TOGGLES, MESSAGE_TYPE_PITCHWHEEL, NOTE_NAMES

def transform_midi(mid, transformation_map, remove_pitch_bends, skip_track_ten):
    """
    Takes a midi file, transforms it according to the supplied map, and returns the transformed
    midi.
    """

    # create dictionary with midi number keys to note values
    note_dict = {i: NOTE_NAMES[i % len(NOTE_NAMES)] for i in range(128)}

    # adjust notes per supplied map
    for track in mid.tracks:
        for message in track:
            # message channel nine indicates what is usually referred to as "track ten"
            if (
                (message.type in MESSAGE_TYPE_NOTE_TOGGLES)
                and skip_track_ten
                and message.channel == 9
            ):
                break

            if message.type == MESSAGE_TYPE_PITCHWHEEL and remove_pitch_bends:
                message.pitch = 0

            if message.type in MESSAGE_TYPE_NOTE_TOGGLES:
                note_name = note_dict[message.note]
                steps_to_raise = transformation_map[note_name]

                result = message.note + steps_to_raise

                # prevent out of range notes by raising or lowering into a valid octave
                if result > 127:
                    result -= 12

                if result < 0:
                    result += 12

                message.note = result

    return mid

def is_transformation_map_valid(transformation_map):
    """
    Validates that the input dictionary:
    1. Contains all required musical note keys.
    2. Ensures all values are integers.
    3. Ensures all values are between -11 and 11.

    Returns bool indicating success or failure.
    """

    required_keys = set(NOTE_NAMES)

    missing_keys = required_keys - transformation_map.keys()
    if missing_keys:
        return False

    for value in transformation_map.values():
        if not isinstance(value, int):
            return False

    for value in transformation_map.values():
        if value > 11 or value < -11:
            return False

    return True
