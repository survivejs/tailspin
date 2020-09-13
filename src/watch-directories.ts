async function watchDirectories(
  directories: string[],
  onModify: () => void,
) {
  const watcher = Deno.watchFs(directories, { recursive: true });

  for await (const event of watcher) {
    console.log("watchDirectories - Detected a change", event);

    if (event.kind === "modify") {
      await onModify();
    }
  }
}

export default watchDirectories;
