import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def main():
    tweet = ""

    response = openai.Completion.create(
        model="text-davinci-002",
        prompt="Generate a emoji that represents the following text:\n\n'I am very happy right now' : 😂\n'I am feeling really I want to go and see a movie tomorrow night Do you want to join me' : ",
        max_tokens=60,
    )

    out = response["choices"][0]["text"]

    print(out)

if __name__ == "__main__":
    main()