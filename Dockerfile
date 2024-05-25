FROM python:3.11

# Create app directory
WORKDIR /app

# Install app dependencies
COPY Recommendation/requirements.txt ./

RUN pip install -r requirements.txt

# Bundle app source
COPY Recommendation /app

EXPOSE 4040
CMD [ "python", "-m uvicorn main:app --reload --port 4040" ]