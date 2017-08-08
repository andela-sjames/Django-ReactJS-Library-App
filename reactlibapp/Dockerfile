FROM python:3.6.2


WORKDIR /reactlibapp
ADD requirements.txt /reactlibapp/
RUN apt-get update && \
    apt-get install -y postgresql python-psycopg2 libpq-dev cython && \
    pip install --upgrade pip && pip install -r requirements.txt

ADD run_web.sh /reactlibapp/

# create unprivileged user
RUN adduser --disabled-password --gecos '' djangoreactapp
COPY . /reactlibapp/

RUN chmod u+x ./run_web.sh
ENTRYPOINT ["./run_web.sh"]
