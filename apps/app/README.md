## run the app

```bash
pnpm dev
```

## run stripe webhook

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe --print-json
```
