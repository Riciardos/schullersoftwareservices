# Schuller Software Services
![CI](https://github.com/Riciardos/schullersoftwareservices/actions/workflows/deploy.yml/badge.svg)

Personal site and API monorepo. React frontend, Micronaut/Java backend running on AWS Lambda, all infrastructure managed with Terraform.

---

## Architecture

```mermaid
graph TD
    subgraph Client
        Browser
    end

    subgraph Auth
        Google[Google Identity Services]
    end

    subgraph DNS
        R53[Route 53]
    end

    subgraph CDN
        CF_FE[CloudFront\nschullersoftwareservices.com]
        CF_API[CloudFront\napi.schullersoftwareservices.com\nCORS handling]
    end

    subgraph Storage
        S3[S3\nReact SPA]
    end

    subgraph Compute
        APIGW[HTTP API Gateway v2]
        Lambda[Lambda\nMicronaut 4 · Java 21\n1024 MB]
    end

    subgraph Data
        DDB[(DynamoDB\nMonthly sharded\nPK: MESSAGES#YYYY-MM\nSK: datetime#uuid)]
    end

    Browser -->|static assets| R53
    Browser -->|API requests| R53
    Browser <-->|OAuth login| Google

    R53 --> CF_FE --> S3
    R53 --> CF_API --> APIGW --> Lambda

    Lambda -->|JWKS validation\ncached 1h| Google
    Lambda -->|Query / PutItem| DDB
```

---

## Repo Structure

```
.
├── api/api/                  # Micronaut Java backend
│   ├── src/main/java/        # Controllers, repositories, models
│   ├── src/main/resources/   # application.yml, application-local.yml
│   └── src/test/             # Unit + Lambda handler integration tests
│
├── frontend/schuller-software-services/
│   ├── src/
│   │   ├── api/              # Axios client + orval-generated typed functions
│   │   ├── components/       # React components + .styles.ts companions
│   │   └── containers/       # Layout components + AuthProvider
│   └── orval.config.ts       # Client generation config
│
├── infra/                    # Terraform
│   ├── api-gateway.tf        # HTTP API Gateway v2 + CORS
│   ├── cloudfront.tf         # CloudFront distributions + Route 53
│   ├── dynamo.tf             # DynamoDB table
│   ├── lambda.tf             # Lambda function + IAM
│   └── s3.tf                 # Frontend bucket
│
├── spec/
│   └── openapi.yml           # OpenAPI spec (generated from Micronaut, committed as contract)
│
└── .github/workflows/
    └── deploy.yml            # CI/CD pipeline
```

---

## CI/CD Pipeline

```mermaid
flowchart LR
    push[Git push] --> api

    subgraph api[1 · API]
        test[mvn test] --> build[mvn package]
        build --> upload[Upload api.jar]
    end

    api --> infra

    subgraph infra[2 · Infra]
        dl[Download api.jar] --> tf[terraform apply]
    end

    infra --> frontend

    subgraph frontend[3 · Frontend]
        gen[yarn generate\norval client] --> fbuild[yarn build]
        fbuild --> ftest[yarn test]
        ftest --> sync[aws s3 sync]
    end

    frontend --> notify[Slack notification]
```

---

## Local Development

**Backend**

```bash
cd api/api
./mvnw mn:run -Dmicronaut.environments=local
# Runs on http://localhost:8080
# application-local.yml enables CORS for localhost:3000
```

**Frontend**

```bash
cd frontend/schuller-software-services
cp .env.local.example .env.local   # set REACT_APP_API_HOST=http://localhost:8080
yarn install
yarn generate   # regenerate typed API client from spec/openapi.yml
yarn start      # http://localhost:3000
```

**Regenerating the OpenAPI client** (after backend changes)

```bash
cd api/api && ./mvnw compile
cp target/classes/META-INF/swagger/swagger.yml ../../spec/openapi.yml
cd ../../frontend/schuller-software-services && yarn generate
```
