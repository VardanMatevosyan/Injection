FROM openjdk:17-jdk-buster

LABEL authors="Vardan"

ENV APP_HOME_DIR=/usr/local/app \
    oauth0-host=YOUR OAUTH HOST HERE

COPY /build/libs/user-service-0.0.1.jar $APP_HOME_DIR/user-service.jar

WORKDIR $APP_HOME_DIR

EXPOSE 9777

ENTRYPOINT ["java", "-Xms1024m", "-Xmx2048m", "-jar", "user-service.jar"]
