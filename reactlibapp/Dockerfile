FROM python:3.6.2

WORKDIR /reactlibapp
ADD requirements.txt /reactlibapp/
RUN pip install -r requirements.txt 
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm

ADD run_web.sh /reactlibapp/
ADD start_app.sh /reactlibapp/

# create unprivileged user
RUN adduser --disabled-password --gecos '' djangoreactapp
COPY . /reactlibapp/

RUN chmod +x ./run_web.sh && chmod +x ./start_app.sh
ENTRYPOINT ["./run_web.sh"]
