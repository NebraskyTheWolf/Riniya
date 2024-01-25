FROM wyzengroup/node18-yarn-gulp
USER root

RUN mkdir /workspace

COPY package.json yarn.lock /workspace/
RUN cd /workspace \
    && yarn install --pure-lockfile \
    && npm install discord.js \
    && npm install @types/mongoose \
    && npm install mongoose \
    && npm install discord-modals

RUN npm install -g tsc \
    && npm install -g concurrently \
    && npm install -g typescript

COPY . /workspace

CMD ["yarn", "run", "start"]
