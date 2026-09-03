FROM mcr.microsoft.com/playwright:v1.40.0-focal

WORKDIR /e2e

COPY package.json package-lock.json ./

RUN npm ci

# Примусово завантажуємо браузери, які відповідають версії 1.62.1 з твого package.json
RUN npx playwright install

COPY . .

CMD ["npx", "playwright", "test"]