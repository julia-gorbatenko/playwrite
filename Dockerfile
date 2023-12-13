FROM mcr.microsoft.com/playwright:v1.39.0-jammy

COPY . /playwright
WORKDIR /playwright

RUN npm ci

CMD ["npm", "test"]
