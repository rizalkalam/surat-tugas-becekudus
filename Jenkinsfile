pipeline{
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

       stage('Deploy HTML File') {
            steps {
                sh 'sudo rm -r /var/www/testingfothink.my.id/html/src/*'
                sh 'sudo cp -r /home/rizalkalam/.jenkins/workspace/reactSTSPD/* /var/www/testingfothink.my.id/html/'
                // sh 'sudo npm install'
		        // sh 'sudo run build'
		        // sh 'scp -r ./build/* /var/www/testingfothink.my.id/html'
            }
        }
    }
}
