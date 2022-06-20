FROM node:12
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./
RUN npm ci 
# Bundle app source
COPY . .

ENV POSTGRES_USERNAME postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB filterimage
ENV POSTGRES_HOST postgres.cst5cbmcpryb.us-east-1.rds.amazonaws.com
ENV AWS_REGION us-east-1
ENV AWS_PROFILE DEPLOYED
ENV AWS_BUCKET s3-02-dev
ENV AWS_ACCESS_KEY_ID AKIAZSZYSL7YJPDQAAWD
ENV AWS_SECRET_ACCESS_KEY 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

ENV JWT_SECRET Aiqw12#76~Xz
ENV URL http://localhost:8100

EXPOSE 8080
CMD [ "npm", "run", "prod" ]

