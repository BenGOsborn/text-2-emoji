FROM public.ecr.aws/lambda/python:3.8

COPY app.py .

COPY requirements.txt  .
RUN  pip3 install -r requirements.txt

CMD [ "app.lambda_handler" ]