# syntax=docker/dockerfile:experimental

# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache rsync
WORKDIR /workspace-install
COPY package.json yarn.lock ./

RUN --mount=type=bind,target=/docker-context \
    rsync -amv --delete \
    --exclude='node_modules' \
    --exclude='*/node_modules' \
    --include='package.json' \
    --include='schema.prisma' \
    --include='*/' --exclude='*' \
    /docker-context/ /workspace-install/;

RUN yarn install

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./ 
# RUN npm ci

# Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /app

COPY . .
COPY --from=deps /workspace-install/node_modules ./node_modules

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build:web

# **********rsync here , copy static & public folder to mnt

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/apps/next/next.config.js \
#                     /app/apps/next/package.json \
#                     ./apps/next/

# COPY --from=builder /app/apps/next/public ./apps/next/public
# COPY --from=builder --chown=nextjs:nodejs /app/apps/next/.next ./apps/next/.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/next/.next/standalone/apps/next ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/next/.next/standalone/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/apps/next/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/next/public ./public

RUN mkdir -p /app/public/images
RUN --security=insecure mkdir /nfs && \
   mount -t nfs -o nolock -o vers=4 nfs.n88club-stage.local:/mnt/k8sdata/em/www/web_static/static/nvclub/nova-club mkdir -p /app/public/images

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
