FROM python:3.6.2

WORKDIR /reactlibapp
ADD requirements.txt /reactlibapp/
RUN pip3 install -r requirements.txt

# update and install broken dependencies before proceeding
RUN apt-get update
RUN apt-get -f install
ONBUILD COPY ./client/package.json /reactlibapp/client/
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
ONBUILD RUN cd /reactlibapp/client/ && npm install

ADD run_web.sh /reactlibapp/

# create user and add to docker group
RUN adduser --disabled-password --gecos '' djangoreactapp
RUN groupadd docker
RUN usermod -aG docker djangoreactapp

# set permission on files for docker sake
RUN chown -R djangoreactapp:$(id -gn djangoreactapp) ~/
RUN chown -R djangoreactapp:$(id -gn djangoreactapp) ~/

ONBUILD COPY . /reactlibapp/
RUN chown -R djangoreactapp:$(id -gn djangoreactapp) /reactlibapp/client/

RUN chmod +x ./run_web.sh && chmod +x ./launch.sh

USER djangoreactapp

ENTRYPOINT ["./run_web.sh"]
