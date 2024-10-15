FROM denoland/deno:alpine

USER deno
WORKDIR /app/src

COPY src/ /app/src/
COPY .env /app/.env

ENTRYPOINT ["deno", "run", "-A", "/app/src/deno.ts"]