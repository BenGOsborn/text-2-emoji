import os
import openai
import string
import emoji
import json

openai.api_key = os.getenv("OPENAI_API_KEY")

def preprocess(text):
    return "".join(char for char in text if char in string.ascii_letters + " " + string.digits)

def extract_first_emoji(text):
    for char in text:
        if emoji.is_emoji(char):
            return char
    
    raise Exception("Failed to find emoji")

def generate_prompt(input_processed):
    return f"Generate a emoji that represents the following text:\n\n'I am very happy right now': 😂\n'I am going to the beach on Saturday': 🏖\n'The movies are going to be fun tomorrow': 🎥\n'{input_processed}': "

def lambda_handler(event, context):
    input_raw = json.loads(event["body"])["input"]
    input_processed = preprocess(input_raw)

    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=f"Generate a emoji that represents the following text:\n\n'I am very happy right now': 😂\n'I am going to the beach on Saturday': 🏖\n'The movies are going to be fun tomorrow': 🎥\n'{input_processed}': ",
        temperature=0,
        max_tokens=60,
    )
    text_raw = response["choices"][0]["text"]

    text_processed = extract_first_emoji(text_raw)

    return {
        "statusCode": 200,
        "body": json.dumps({"emoji": text_processed})
    }