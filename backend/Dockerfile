# ---------- Stage 1: build ----------
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /build

# Cache dependencies: only re-runs when pom.xml changes
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn -B clean package -DskipTests \
 && cp target/*.jar application.jar

# Split the jar into layers
RUN java -Djarmode=tools -jar application.jar extract --layers --destination extracted

# ---------- Stage 2: runtime ----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring

# Least-changing layers first, your code last
COPY --from=build /build/extracted/dependencies/ ./
COPY --from=build /build/extracted/spring-boot-loader/ ./
COPY --from=build /build/extracted/snapshot-dependencies/ ./
COPY --from=build /build/extracted/application/ ./

# Training run: create the CDS archive
RUN DB_HOST=localhost DB_PORT=5432 DB_NAME=x DB_USERNAME=x DB_PASSWORD=x \
    java -XX:ArchiveClassesAtExit=application.jsa \
    -Dspring.context.exit=onRefresh \
    -Dspring.main.lazy-initialization=false \
    -Dspring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect \
    -Dspring.jpa.properties.hibernate.boot.allow_jdbc_metadata_access=false \
    -Dserver.port=0 \
    -jar application.jar

USER spring

ENTRYPOINT ["java", \
  "-XX:SharedArchiveFile=application.jsa", \
  "-XX:TieredStopAtLevel=1", \
  "-XX:+UseSerialGC", \
  "-XX:MaxRAMPercentage=70", \
  "-Xss512k", \
  "-jar", "application.jar"]