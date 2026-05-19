pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = credentials('DOCKER_USERNAME')
        DOCKER_HUB_PASS = credentials('DOCKER_PASSWORD')
        USER_SERVICE_IMAGE        = "${DOCKER_HUB_USER}/user-service"
        PRODUCT_SERVICE_IMAGE     = "${DOCKER_HUB_USER}/product-service"
        ORDER_SERVICE_IMAGE       = "${DOCKER_HUB_USER}/order-service"
        NOTIFICATION_SERVICE_IMAGE = "${DOCKER_HUB_USER}/notification-service"
    }

    stages {

        // ── Stage 1: Checkout ─────────────────────────────────
        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
            }
        }

        // ── Stage 2: Install Dependencies ─────────────────────
        stage('Install Dependencies') {
            parallel {
                stage('User Service') {
                    steps {
                        dir('src/user-service') {
                            echo '📦 Installing User Service dependencies...'
                            sh 'npm install'
                        }
                    }
                }
                stage('Product Service') {
                    steps {
                        dir('src/product-service') {
                            echo '📦 Installing Product Service dependencies...'
                            sh 'npm install'
                        }
                    }
                }
                stage('Order Service') {
                    steps {
                        dir('src/order-service') {
                            echo '📦 Installing Order Service dependencies...'
                            sh 'npm install'
                        }
                    }
                }
                stage('Notification Service') {
                    steps {
                        dir('src/notification-service') {
                            echo '📦 Installing Notification Service dependencies...'
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        // ── Stage 3: Test ──────────────────────────────────────
        stage('Test') {
            parallel {
                stage('Test User Service') {
                    steps {
                        dir('src/user-service') {
                            echo '🧪 Testing User Service...'
                            sh 'npm test || true'
                        }
                    }
                }
                stage('Test Product Service') {
                    steps {
                        dir('src/product-service') {
                            echo '🧪 Testing Product Service...'
                            sh 'npm test || true'
                        }
                    }
                }
                stage('Test Order Service') {
                    steps {
                        dir('src/order-service') {
                            echo '🧪 Testing Order Service...'
                            sh 'npm test || true'
                        }
                    }
                }
                stage('Test Notification Service') {
                    steps {
                        dir('src/notification-service') {
                            echo '🧪 Testing Notification Service...'
                            sh 'npm test || true'
                        }
                    }
                }
            }
        }

        // ── Stage 4: Docker Build ──────────────────────────────
        stage('Docker Build') {
            steps {
                echo '🐳 Building Docker images...'
                sh 'docker build -t ${USER_SERVICE_IMAGE}:latest ./src/user-service'
                sh 'docker build -t ${PRODUCT_SERVICE_IMAGE}:latest ./src/product-service'
                sh 'docker build -t ${ORDER_SERVICE_IMAGE}:latest ./src/order-service'
                sh 'docker build -t ${NOTIFICATION_SERVICE_IMAGE}:latest ./src/notification-service'
                echo '✅ All Docker images built successfully.'
            }
        }

        // ── Stage 5: Docker Push ───────────────────────────────
        stage('Docker Push') {
            steps {
                echo '🚀 Pushing Docker images to Docker Hub...'
                sh '''
                    echo "$DOCKER_HUB_PASS" | docker login -u "$DOCKER_HUB_USER" --password-stdin
                    docker push ${USER_SERVICE_IMAGE}:latest
                    docker push ${PRODUCT_SERVICE_IMAGE}:latest
                    docker push ${ORDER_SERVICE_IMAGE}:latest
                    docker push ${NOTIFICATION_SERVICE_IMAGE}:latest
                '''
                echo '✅ All images pushed to Docker Hub.'
            }
        }

        // ── Stage 6: Deploy to Kubernetes ─────────────────────
        stage('Deploy to Kubernetes') {
            steps {
                echo '☸️ Deploying to Kubernetes cluster...'
                sh 'kubectl apply -f k8s/secret.yaml'
                sh 'kubectl apply -f k8s/configmap.yaml'
                sh 'kubectl apply -f k8s/mongo-deployment.yaml'
                sh 'kubectl apply -f k8s/user-deployment.yaml'
                sh 'kubectl apply -f k8s/product-deployment.yaml'
                sh 'kubectl apply -f k8s/order-deployment.yaml'
                sh 'kubectl apply -f k8s/notification-deployment.yaml'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                sh 'kubectl apply -f k8s/ingress.yaml'
                echo '✅ All services deployed to Kubernetes.'
            }
        }

        // ── Stage 7: Verify Rollout ────────────────────────────
        stage('Verify Rollout') {
            steps {
                echo '🔍 Verifying deployments are running...'
                sh 'kubectl rollout status deployment/user-service'
                sh 'kubectl rollout status deployment/product-service'
                sh 'kubectl rollout status deployment/order-service'
                sh 'kubectl rollout status deployment/notification-service'
                sh 'kubectl rollout status deployment/frontend'
                echo '✅ All deployments verified.'
            }
        }

        // ── Stage 8: Notify ────────────────────────────────────
        stage('Notify') {
            steps {
                echo '🔔 Sending deployment notification...'
                echo "✅ Deployment successful!"
                echo "Branch:   ${env.BRANCH_NAME}"
                echo "Build:    #${env.BUILD_NUMBER}"
                echo "Images pushed to Docker Hub under: ${DOCKER_HUB_USER}"
            }
        }

    }

    // ── Post Actions ───────────────────────────────────────────
    post {
        success {
            echo '🎉 Pipeline completed successfully! All services are live.'
        }
        failure {
            echo '❌ Pipeline failed! Initiating rollback...'
            sh '''
                kubectl rollout undo deployment/user-service        || true
                kubectl rollout undo deployment/product-service     || true
                kubectl rollout undo deployment/order-service       || true
                kubectl rollout undo deployment/notification-service || true
                kubectl rollout undo deployment/frontend            || true
            '''
            echo '⚠️ Rollback complete. Check logs for failure details.'
        }
        always {
            echo '🧹 Cleaning up Docker images from local runner...'
            sh '''
                docker rmi ${USER_SERVICE_IMAGE}:latest         || true
                docker rmi ${PRODUCT_SERVICE_IMAGE}:latest      || true
                docker rmi ${ORDER_SERVICE_IMAGE}:latest        || true
                docker rmi ${NOTIFICATION_SERVICE_IMAGE}:latest || true
            '''
        }
    }
}
