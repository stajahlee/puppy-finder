FROM node:11.11.0
COPY . .
RUN npm install 
RUN npm run build --production 
RUN npm install -g serve
CMD npm start
EXPOSE 5000