# Install deno if not already exists
if ! command -v deno
then
    curl -fsSL https://deno.land/x/install/install.sh | sh
fi

# Run deno server
deno run --allow-net server.ts &
deno_pid=$!
echo $deno_pid