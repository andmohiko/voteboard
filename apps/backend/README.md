# Voteboard Backend

```
npm install
npm run dev
```

```
open http://localhost:3000
```

## Deploy

```
$ gcloud run deploy backend \
  --project dev-voteboard \
  --image gcr.io/dev-voteboard/backend \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --port 8080 \
  --env-vars-file=apps/backend/.env.yaml
```
