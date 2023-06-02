# syntax=docker/dockerfile:experimental

# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache rsync
RUN apk add git
WORKDIR /workspace-install

COPY .yarnrc.yml ./.yarnrc.yml
COPY .yarn ./.yarn
COPY package.json ./
COPY yarn.lock ./
COPY apps/next/package.json ./apps/next/
COPY apps/expo/package.json ./apps/expo/
COPY packages/app/package.json ./packages/app/
COPY packages/services/package.json ./packages/services/
COPY packages/utils/package.json ./packages/utils/

RUN yarn install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder 

WORKDIR /app

COPY . .
COPY --from=deps /workspace-install/node_modules ./node_modules

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build:web

# **********rsync here , copy static & public folder to mnt

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app
RUN apk add --no-cache rsync

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

#RUN mkdir -p /app/public/images \
#   mount -t nfs -o nolock -o vers=4 nfs.n88club-stage.local:/mnt/k8sdata/em/www/web_static/static/nvclub/nova-club /app/public/images \
#   cp -fr /app/.next/static/* /app/public/images

# RUN chmod 777 /app/.next/static -R
# RUN chown nobody.nobody /app/.next/static -R
# RUN echo "SYNCvtXQwsmUcH" > /app/.rsyncd.secrets
# RUN chmod 600 /app/.rsyncd.secrets
# RUN rsync -av --password-file=/app/.rsyncd.secrets /app/.next/static/ root@nfs-next.n88club.local::web_static/nova-club/next

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
