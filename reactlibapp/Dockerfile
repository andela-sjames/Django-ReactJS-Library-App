FROM python:3.6.2

WORKDIR /reactlibapp
ADD requirements.txt /reactlibapp/
RUN pip install -r requirements.txt 

# update and install broken dependencies before proceeding
RUN apt-get update
RUN apt-get -f install
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN npm install webpack -g

ADD run_web.sh /reactlibapp/
ADD start_app.sh /reactlibapp/

# create user and add to docker group
RUN adduser --disabled-password --gecos '' djangoreactapp
RUN groupadd docker
RUN usermod -aG docker djangoreactapp

# set permission on files for docker sake
RUN chown -R djangoreactapp:$(id -gn djangoreactapp) ~/
RUN chown -R djangoreactapp:$(id -gn djangoreactapp) ~/

COPY . /reactlibapp/
RUN chown -R djangoreactapp:$(id -gn djangoreactapp) /reactlibapp/client/

RUN chmod +x ./run_web.sh && chmod +x ./start_app.sh
ENTRYPOINT ["./run_web.sh"]
