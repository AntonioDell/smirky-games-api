FROM hayd/debian-deno:1.5.2

# The port that your application listens to.
EXPOSE 8001  

ENV PORT 8001

WORKDIR /api


# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache server.ts

# Enable this line if you want hot reload
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "server.ts"]
