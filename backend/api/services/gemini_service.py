import os
import google.generativeai as genai

from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


def translate_text(
    text,
    source_language,
    target_language
):
    prompt = f"""
    Translate the following text.

    Source Language:
    {source_language}

    Target Language:
    {target_language}

    Text:
    {text}

    Return ONLY the translated text.
    """

    response = model.generate_content(prompt)

    return response.text.strip()