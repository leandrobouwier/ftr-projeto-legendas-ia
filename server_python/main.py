from flask import Flask, request, send_from_directory

app = Flask(__name__)

from models.api import convert_text_to_audio
from utils import save_audio

import uuid

@app.route("/")
def hello():
    return "Hello"

@app.route("/text_to_audio", methods= ["POST"])
def text_to_audio():
    text = request.json["text"]

    audio = convert_text_to_audio(text)

    file_id = uuid.uuid4()
    save_audio(audio, file_id)

    return f"audio/{file_id}.wav"


@app.route ("/audio/<path:audio_file>")
def get_audio(audio_file):
    return send_from_directory("audio", audio_file)