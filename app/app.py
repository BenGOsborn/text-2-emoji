import os
import openai
import string
import emoji
import json

openai.api_key = os.getenv("OPENAI_API_KEY")


def preprocess(text):
    return "".join(char for char in text if char in string.ascii_letters + " " + string.digits)


def extract_emojis(text):
    seen = {}
    out = []

    for char in text:
        if emoji.is_emoji(char) and char not in seen:
            out.append(char)
            seen[char] = True

    return out


def generate_prompt(text):
    return "Generate a list of emojis that represents the following text:\n" + \
        "\n'I am very happy right now': 😂😄😃" + "\n'I am going to the beach on Saturday': 🏖👙⛱" + \
        "\n'The movies are going to be fun tomorrow': 🎥🎬🍿\n" + f"\n'{text}': "


def lambda_handler(event, context):
    input_raw = json.loads(event["body"])["input"]
    input_processed = preprocess(input_raw)

    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=generate_prompt(input_processed),
        temperature=0,
        max_tokens=30,
    )
    text_raw = response["choices"][0]["text"]

    return {
        "statusCode": 200,
        "body": json.dumps({"emoji": extract_emojis(text_raw)}),
        "headers": {
            "Access-Control-Allow-Origin": "*"
        }
    }


if __name__ == "__main__":
    sample_text = "University is really starting to irritate me"

    response = lambda_handler(
        {"body": json.dumps({"input": sample_text})}, None)

    parsed = json.loads(response["body"])["emoji"]

    print(parsed)
