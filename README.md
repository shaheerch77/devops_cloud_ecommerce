# ShopCloud — Cloud-Native E-Commerce Platform

> A fully containerized, microservices-based e-commerce platform built with Node.js, Docker, Kubernetes, and automated CI/CD pipelines using GitHub Actions and Jenkins.

---

## 🌐 Live Deployments

| Environment | URL | Branch |
|---|---|---|
| 🟢 Production | https://devops-cloud-ecommerce.onrender.com | `main` |
| 🟡 Staging | https://shopcloud-q0tw.onrender.com | `staging` |
| 🔵 Development | https://shopcloud-development-9eon.onrender.com | `develop` |

---

## 📁 Project Structure

```
devops-cloud-ecommerce/
├── .github/
│   └── workflows/
│       ├── ci.yml                     # CI pipeline (lint + build check)
│       ├── cd-development.yml         # CD pipeline for development
│       ├── cd-staging.yml             # CD pipeline for staging
│       └── cd-production.yml          # CD pipeline for production
├── src/
│   ├── frontend/                      # Static HTML/CSS frontend
│   │   ├── index.html                 # Dashboard
│   │   ├── login.html                 # User login & register
│   │   ├── products.html              # Product catalog
│   │   ├── orders.html                # Order management
│   │   ├── notifications.html         # Notification center
│   │   └── style.css                  # Shared styles
│   ├── user-service/                  # User auth & profiles (port 5000)
│   ├── product-service/               # Product catalog CRUD (port 5001)
│   ├── order-service/                 # Order processing (port 5002)
│   └── notification-service/          # In-app notifications (port 5003)
├── k8s/
│   ├── secret.yaml                    # Kubernetes Secrets
│   ├── configmap.yaml                 # Kubernetes ConfigMap
│   ├── mongo-deployment.yaml          # MongoDB StatefulSet
│   ├── user-deployment.yaml           # User Service Deployment
│   ├── product-deployment.yaml        # Product Service Deployment
│   ├── order-deployment.yaml          # Order Service Deployment
│   ├── notification-deployment.yaml   # Notification Service Deployment
│   ├── frontend-deployment.yaml       # Frontend Deployment
│   └── ingress.yaml                   # Ingress routing
├── Jenkinsfile                        # Jenkins declarative pipeline
├── docker-compose.yml                 # Local development setup
├── Dockerfile                         # Base Dockerfile
├── .gitignore
└── .dockerignore
```

---

## 🔧 Microservices Overview

| Service | Port | Description |
|---|---|---|
| **User Service** | 5000 | Registration, login, JWT authentication |
| **Product Service** | 5001 | Product catalog, CRUD operations |
| **Order Service** | 5002 | Order placement, tracking, status updates |
| **Notification Service** | 5003 | In-app notifications for order events |
| **Frontend** | 8080 | Static HTML/CSS dashboard served via Nginx |
| **MongoDB** | 27017 | Shared database for all services |

---

## 🚀 Running Locally with Docker

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/download/win)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/shaheerch77/devops_cloud_ecommerce.git
cd devops_cloud_ecommerce
```

**2. Build and start all services**
```bash
docker-compose up --build
```

**3. Access the application**

| Service | URL |
|---|---|
| Frontend Dashboard | http://localhost:8080 |
| User Service API | http://localhost:5000 |
| Product Service API | http://localhost:5001 |
| Order Service API | http://localhost:5002 |
| Notification Service API | http://localhost:5003 |

**4. Stop all services**
```bash
docker-compose down
```

---

## 📡 API Endpoints

### User Service (`:5000`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login and get JWT token |
| GET | `/api/users/profile` | Get user profile |

### Product Service (`:5001`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create product |
| GET | `/api/products/:id` | Get single product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Order Service (`:5002`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place new order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/user/:userId` | Get orders by user |
| GET | `/api/orders/:id` | Get order by ID |
| PUT | `/api/orders/:id/status` | Update order status |
| PUT | `/api/orders/:id/cancel` | Cancel order |

### Notification Service (`:5003`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/notifications` | Send notification |
| GET | `/api/notifications/user/:id` | Get user notifications |
| GET | `/api/notifications/user/:id/unread` | Get unread notifications |
| PUT | `/api/notifications/:id/read` | Mark as read |
| DELETE | `/api/notifications/:id` | Delete notification |

---

## ⚙️ CI/CD Pipeline

### GitHub Actions Workflows

| Workflow | Trigger | Actions |
|---|---|---|
| `ci.yml` | Push to `develop` | Install deps, run tests, Docker build check |
| `cd-development.yml` | Push to `develop` | Build & push `:dev` images, deploy to Render dev |
| `cd-staging.yml` | Push to `staging` | Build & push `:staging` images, deploy to Render staging |
| `cd-production.yml` | Push to `main` | Build & push `:latest` images, deploy to Render production |

### Jenkins Pipeline Stages

```
Checkout → Install Dependencies → Test → Docker Build → Docker Push → Deploy to Kubernetes → Verify Rollout → Notify
```

- **Parallel execution** for install and test stages
- **Automatic rollback** via `kubectl rollout undo` on failure
- **Cleanup** of local Docker images after every run

---

## ☸️ Kubernetes Deployment

### Apply all manifests
```bash
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/mongo-deployment.yaml
kubectl apply -f k8s/user-deployment.yaml
kubectl apply -f k8s/product-deployment.yaml
kubectl apply -f k8s/order-deployment.yaml
kubectl apply -f k8s/notification-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml
```

### Key Features
- **2 replicas** per service for high availability
- **Rolling updates** with zero downtime (`maxSurge: 1`, `maxUnavailable: 0`)
- **Secrets** for sensitive data (MONGO_URI, JWT_SECRET)
- **ConfigMaps** for environment-specific configuration
- **StatefulSet** for MongoDB with persistent volume
- **Ingress** routing all `/api/*` paths to correct services

---

## 🌿 Git Branch Strategy (Git Flow)

| Branch | Purpose |
|---|---|
| `main` | Production — stable, protected |
| `staging` | Pre-production testing |
| `develop` | Active development |

All changes go through Pull Requests. Direct pushes to `main` are protected.

---

## 🔐 Secrets Management

Secrets are managed at two levels:

- **GitHub Environments** — `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `RENDER_DEPLOY_HOOK` stored per environment
- **Kubernetes Secrets** — `MONGO_URI` and `JWT_SECRET` injected into pods at runtime via `secret.yaml`

---

## 📝 Reflection

This project gave us hands-on experience with containerizing microservices using Docker and orchestrating them with Kubernetes. Setting up separate CI/CD pipelines for three environments (development, staging, production) using GitHub Actions was challenging but taught us real-world DevOps practices. Managing secrets securely across GitHub Environments, Kubernetes, and Render deployments was a key learning outcome, and implementing rolling updates with automatic rollback gave us confidence in zero-downtime deployment strategies.

---

## 👥 Team

| # | Name | Roll Number | Role | Page Developed | Workflow Created |
|---|---|---|---|---|---|
| 1 | **Shaheer Arshad** *(Team Lead)* | FA23-BCS-129 | Team Lead, DevOps Engineer | Home Page (`index.html`) + Login Page (`login.html`) | CI Pipeline + CD Production |
| 2 | **Lailmah** | FA23-BCS-076 | Frontend Developer, Backend Developer | Products Page (`products.html`) + Orders Page (`orders.html`) | CD Staging |
| 3 | **Faizan Mudassar** | FA23-BCS-043 | Backend Developer, K8s Engineer | Notifications Page (`notifications.html`) | CD Development |

---

## 📦 Docker Hub

Images available at: `https://hub.docker.com/u/shaheerch67`

| Image | Tags |
|---|---|
| `shaheerch67/user-service` | `latest`, `staging`, `dev` |
| `shaheerch67/product-service` | `latest`, `staging`, `dev` |
| `shaheerch67/order-service` | `latest`, `staging`, `dev` |
| `shaheerch67/notification-service` | `latest`, `staging`, `dev` |
