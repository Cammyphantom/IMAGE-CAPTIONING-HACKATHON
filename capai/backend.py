from flask import Flask, request, jsonify,send_file
import io
from PIL import Image
from main import get_caption
from flask_cors import CORS
from io import BytesIO
from main_gemini import draw_caption
app = Flask(__name__)
CORS(app)
@app.route('/roast', methods=['POST'])
def roast():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['image']
    image = Image.open(file.stream).convert("RGB")
    roasted = draw_caption(image)

    # Save to memory for sending
    img_io = BytesIO()
    roasted.save(img_io, 'JPEG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')
@app.route('/get-caption', methods=['POST'])
def get_caption_api():
    if 'image' not in request.files:
        return jsonify({"error": "No image file found"}), 400

    file = request.files['image']
    
    # Read the image file as a numpy array
    file_bytes = file.read()
    image_stream = io.BytesIO(file_bytes)

    # Pass the BytesIO object directly to get_caption (it acts like a file)
    try:
        print("image_stream")
        caption = get_caption(image_stream)
        print("done")
    except Exception as e:
        print("error_________")
        return jsonify({"error": str(e)}), 500

    
    return jsonify({
        "caption":caption
    })

if __name__ == '__main__':
    app.run(debug=False)
