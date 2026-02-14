# Dockerfile to replicate Vercel build environment
FROM node:18-alpine

WORKDIR /app

# Copy the entire project
COPY . .

# Install dependencies at root level (for vercel.json commands)
RUN npm install

# Run the same build command that Vercel uses
RUN npm --prefix website run build

# If we get here, the build succeeded
RUN echo "✅ Build successful!"
