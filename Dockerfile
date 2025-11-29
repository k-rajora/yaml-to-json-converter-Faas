FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get install -y \
    docker.io \
    python3 python3-pip \
    zip \
    awscli \
    git \
    curl \
    unzip \
    && rm -rf /var/lib/apt/lists/*


RUN curl -o /tmp/sonar.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip \
    && unzip /tmp/sonar.zip -d /opt \
    && mv /opt/sonar-scanner-* /opt/sonar-scanner \
    && rm /tmp/sonar.zip

ENV PATH="$PATH:/opt/sonar-scanner/bin"

RUN usermod -aG docker jenkins

USER jenkins
