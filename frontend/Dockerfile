FROM node:20

WORKDIR /app
COPY . .

# Set environment variable for VITE_API_URL
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm install
RUN npm run build

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]