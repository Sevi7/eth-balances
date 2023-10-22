FROM node:18.18.2-bookworm-slim AS base

###################
# BUILD STAGE
###################

FROM base AS builder

# Change to base directory
WORKDIR /home/node

# Copy files from context
COPY --chown=node:node . .

# Install all the dependencies
RUN npm install --frozen-lockfile

# Build the package
RUN npm run build

############################
# PROD DEPENDENCIES STAGE
############################

FROM builder AS prod-deps

RUN npm install --prod --frozen-lockfile --config.confirmModulesPurge=false

###################
# RUN STAGE
###################
FROM base AS runner

# Install dumb-init
RUN apt update && apt install -qq -y --no-install-recommends dumb-init

# Set env variables
ENV NODE_OPTIONS=--enable-source-maps

# Use a unpriviledged user instead of root
USER node

WORKDIR /home/node/

# Copy the built app from the steps before
COPY --from=builder --chown=node:node /home/node/dist/ .

#Copy production dependencies from the steps before
COPY --from=prod-deps --chown=node:node /home/node/node_modules node_modules

# Expose port
EXPOSE 3000

# Start the server using the production build
CMD [ "dumb-init", "node", "src/app.js" ]