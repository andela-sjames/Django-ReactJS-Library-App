FROM python:3.6.2

# update package lists, fix broken system packages and install node
RUN apt-get update
RUN apt-get -f install
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

# install and cache dependencies in /tmp directory.
# doing it this way also installs any newly added dependencies.
ADD client/package.json /tmp/package.json
ADD requirements.txt /tmp/requirements.txt
RUN cd /tmp && npm install
RUN pip3 install -r /tmp/requirements.txt

# load project files and set work directory
ADD . /app/
RUN cp -a /tmp/node_modules /app/client/
WORKDIR /app

# connect work directory to host filesystem
VOLUME ["/app"]

# create user and add to docker group
RUN adduser --disabled-password --gecos '' djangoreactapp
RUN groupadd docker
RUN usermod -aG docker djangoreactapp

# grant newly created user permissions on essential files
RUN chown -R djangoreactapp:$(id -gn djangoreactapp) ~/
RUN chown -R djangoreactapp:$(id -gn djangoreactapp) /app/
RUN chmod +x ./scripts/run_web.sh && chmod +x ./scripts/launch.sh
ENV PYTHONUNBUFFERED 1

# change user to newly created user
USER djangoreactapp

CMD ["./scripts/run_web.sh", "docker"]
