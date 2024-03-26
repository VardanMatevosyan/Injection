FROM openjdk:17-jdk-buster

LABEL authors="Vardan"

ENV APP_HOME_DIR=/usr/local/app

COPY /build/libs/hackcode-0.0.1.jar $APP_HOME_DIR/hackcode-service.jar

WORKDIR $APP_HOME_DIR

EXPOSE 8777

ENTRYPOINT ["java", "-Xms1024m", "-Xmx2048m", "-jar", "hackcode-service.jar"]
