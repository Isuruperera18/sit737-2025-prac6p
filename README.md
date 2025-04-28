# Calculator Microservice API

This project is a simple **Calculator Microservice API** developed using **Node.js** and **Express** that performs both basic and advanced arithmetic operations. In this task, you will **Dockerize** the application to enable consistent deployment across different environments.

## Features

- **Addition**: Adds two numbers.
- **Subtraction**: Subtracts two numbers.
- **Multiplication**: Multiplies two numbers.
- **Division**: Divides two numbers, with a check for division by zero.
- **Exponentiation**: Raises a number to a given power.
- **Square Root**: Computes the square root of a non-negative number.
- **Modulo**: Computes the remainder of division between two numbers.

## Technologies Used

- **Node.js**
- **Express**
- **REST API**
- **Microservice Architecture**
- **Winston** - logging
- **dotenv** - environment variable management
- **CORS** - enabling cross-origin requests
- **Docker**

## Requirements

Before getting started, ensure you have the following installed:

- **Git**: To clone the repository and manage version control.
- **Visual Studio Code** (VSCode): A popular IDE for editing and running JavaScript applications.
- **Node.js**: To run the application. You can download it from [nodejs.org](https://nodejs.org/).
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Isuruperera18/sit737-2025-prac5p.git
cd sit737-2025-prac5p
```

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 3. Configuration

Create a `.env` file in the root directory with the following content:

```bash
PORT=3000
```

### 4. Start the Application

Run the application using:

```bash
npm start
```

The API will start on `http://localhost:3000`. Modify the `.env` file if you need a different port.

## API Endpoints

### 1. Addition

- **Endpoint:** `POST /api/calculator/add`
- **Request Body:**
  ```json
  {
    "num1": 10,
    "num2": 4
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Addition successful",
    "result": 14
  }
  ```

### 2. Subtraction

- **Endpoint:** `POST /api/calculator/subtract`
- **Request Body:**
  ```json
  {
    "num1": 20,
    "num2": 3
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Subtraction successful",
    "result": 17
  }
  ```

### 3. Multiplication

- **Endpoint:** `POST /api/calculator/multiply`
- **Request Body:**
  ```json
  {
    "num1": 12,
    "num2": 2
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Multiplication successful",
    "result": 24
  }
  ```

### 4. Division

- **Endpoint:** `POST /api/calculator/divide`
- **Request Body:**
  ```json
  {
    "num1": 12,
    "num2": 4
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Division successful",
    "result": 3
  }
  ```

### 5. Exponentiation

- **Endpoint:** `POST /api/calculator/exponent`
- **Request Body:**
  ```json
  {
    "base": 2,
    "exponent": 3
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Exponentiation successful",
    "result": 8
  }
  ```

### 6. Square Root

- **Endpoint:** `POST /api/calculator/squareRoot`
- **Request Body:**
  ```json
  {
    "number": 16
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Square root successful",
    "result": 4
  }
  ```

### 7. Modulo

- **Endpoint:** `POST /api/calculator/modulo`
- **Request Body:**
  ```json
  {
    "dividend": 10,
    "divisor": 3
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Modulo operation successful",
    "result": 1
  }
  ```

## Error Handling

If invalid inputs or missing parameters are provided, the API will return meaningful error messages.

### Example Errors

- **Missing Parameters:**
  ```json
  {
    "success": false,
    "message": "All inputs are required"
  }
  ```
- **Invalid Input:**
  ```json
  {
    "success": false,
    "message": "All inputs must be valid numbers"
  }
  ```
- **Division by Zero:**
  ```json
  {
    "success": false,
    "message": "Cannot divide by zero"
  }

- **Non-negative Number:**
  ```json
  {
    "success": false,
    "message": "Input must be a non-negative number"
  }
  
## Dockerizing the Application

This section guides you through containerizing the application using Docker.

#### 1. Install Docker  
Ensure Docker Desktop is installed and running on your machine.

#### 2. Create a Dockerfile (Dockerfile)
create a dockerfile in the project root folder with the name as `Dockerfile` without any file extension
```bash
# Use the official Node.js LTS image as the base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
```

#### 3. Create a Docker Compose File (docker-compose.yml)
```bash
version: '3.8'

services:
  calculator:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

#### 4. Install Docker Extension in VSCode
To install the Docker extension in Visual Studio Code:

  1. Open **Visual Studio Code**.
  2. Go to the **Extensions** view by clicking on the Extensions icon in the Activity Bar on the side of the window.
  3. In the search box, type **Docker**.
  4. Select the **Docker** extension by **Microsoft** from the search results.
  5. Click **Install** to install the extension.

#### 5. Log in to Docker Hub from VSCode

After installing the Docker extension, you need to log in to Docker Hub:

  1. Open the **Command Palette** by pressing `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac).
  2. Type **Docker: Sign In** and select the **Docker: Sign In** command.
  3. A prompt will appear for you to enter your **Docker Hub username** and **password**.
  4. After successfully logging in, you should see your Docker Hub account in the Docker view of the sidebar.

## Set Up Kubernetes Cluster

#### 1. Install Minikube 
```bash
choco install minikube   # for Windows (using Chocolatey)
brew install minikube    # for Mac
 ```
#### 2. Start Minikube:
```bash
minikube start
 ```

#### 3. Check cluster status:
```bash
kubectl cluster-info
 ```

## Build and Push Docker Image
#### 1. Build the Docker Image

```bash
docker build -t sit737-2025-prac6p .
```

#### 2. Push your image to DockerHub:

```bash
docker tag sit737-2025-prac6p s223182277/sit737-2025-prac6p
docker push s223182277/sit737-2025-prac6p
```
You can check my Docker Hub image registry at the following URL: https://hub.docker.com/r/s223182277/sit737-2025-prac6p

## Create Kubernetes Deployment

#### 1. Create a deployment.yaml file in root:
```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sit737-2025-prac6p-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: sit737-2025-prac6p
  template:
    metadata:
      labels:
        app: sit737-2025-prac6p
    spec:
      containers:
      - name: sit737-2025-prac6p
        image: s223182277/sit737-2025-prac6p:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
```

#### 2. Apply the deployment:
```bash
kubectl apply -f deployment.yaml
```

#### 3. Check if pods are running:
```bash
kubectl get pods
```

## Create Kubernetes Service
This service exposes your app so you can access it.

#### 1. Create a service.yaml file:
```bash
apiVersion: v1
kind: Service
metadata:
  name: sit737-2025-prac6p-service
spec:
  type: NodePort
  selector:
    app: sit737-2025-prac6p
  ports:
    - protocol: TCP
      port: 3000
```

#### 2. Apply the service:
```bash
kubectl apply -f service.yaml
```
#### 3. Get service info:
```bash
kubectl get services
```

#### 4. Run Service using Minikube:
```bash
minikube service sit737-2025-prac6p-service
```