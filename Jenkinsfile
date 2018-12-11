pipeline {
    agent any

    stages {
        stage('Checking out from repo ...') {
            steps {
                git 'https://github.com/terancet/ssl-management-tool'
            }
        }
        stage('Building and testing') {
            steps {
                echo 'Building..'
                sh 'gradlew clean build -x test'

                echo 'Testing..'
                sh 'gradlew clean build'
            }
        }
    }
}