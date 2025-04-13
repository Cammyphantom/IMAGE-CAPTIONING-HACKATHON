api_key="AIzaSyB8UCRNY-g--_xZKQM5DeSzOXuIWzt2pK0"



from google import genai
from PIL import Image, ImageDraw, ImageFont
client = genai.Client(api_key=api_key)
# img = Image.open("main.jpg")
# img_path = "main.jpg"
# file_ref = client.files.upload(file=img_path)

# response = client.models.generate_content(
#     model="gemini-2.0-flash", contents="Give me a fun fact about space!"
# )
# print(response.text)
image =Image.open('main.jpg').convert("RGB")



def draw_caption(image):
    response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=["Roast this image like a stand-up comedian in 50 words", image])

    caption = response.text.strip()
    print("Roast:", caption)
    draw = ImageDraw.Draw(image)
    try:
        font = ImageFont.truetype("arial.ttf", size=60)
    except:
        font = ImageFont.load_default()

    width, height = image.size

    # Word-wrap text
    max_width = width - 10
    words = caption.split()
    lines = []
    current_line = ""

    for word in words:
        test_line = f"{current_line} {word}".strip()
        if draw.textlength(test_line, font=font) <= max_width:
            current_line = test_line
        else:
            lines.append(current_line)
            current_line = word
    if current_line:
        lines.append(current_line)

    # Calculate line height using font bounding box
    _, _, _, line_height = font.getbbox("A")
    line_height += 10  # add spacing between lines

    # Draw text at the top of the image
    y_text = 20  # top padding
    for line in lines:
        text_width = draw.textlength(line, font=font)
        x = (width - text_width) / 2  # center align
        draw.text((x, y_text), line, font=font, fill="black", stroke_width=2, stroke_fill="black")
        y_text += line_height

    return image


# --- Step 5: Save Final Output ---
# caption="Roast: Alright, alright, settle down folks! We have here a man clearly sponsored by the color of dirt. Maroon shirt? Check. Khaki pants? Double check! I'm not sure what's more depressing, the blank wall he's posing against or the tiny crocodile on his shirt looking like it's trying to escape. He looks like he just finished filing his taxes. I'm kidding, I'm kidding! He probably just finished coding something nobody will ever use. Seriously, though, is he lost? Or did he finally get caught trying to return that ugly red shirt to Ross?"
draw_caption(image)