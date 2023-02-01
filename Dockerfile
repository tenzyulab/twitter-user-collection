FROM node:18.12.1-bullseye as builder
WORKDIR /work
COPY package.json .
RUN npm i
COPY tsconfig.json .
COPY src ./src
RUN npm run build

FROM node:18.12.1-bullseye-slim
WORKDIR /work
COPY package.json .
COPY --from=builder /work/dist /work/dist
CMD ["npm", "start"]
