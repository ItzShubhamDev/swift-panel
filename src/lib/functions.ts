function formatBytes(bytes: number, unit: "KB" | "MB" | "GB") {
  if (bytes < 0) bytes = -bytes;
  if (unit === "KB") {
    return parseFloat((bytes / 1024).toFixed(2));
  } else if (unit === "MB") {
    return parseFloat((bytes / 1024 ** 2).toFixed(2));
  } else if (unit === "GB") {
    return parseFloat((bytes / 1024 ** 3).toFixed(2));
  } else {
    return bytes;
  }
}

function formatDuration(ms: number) {
  if (ms < 0) ms = -ms;

  const time = {
    d: Math.floor(ms / 86400000),
    h: Math.floor(ms / 3600000) % 24,
    m: Math.floor(ms / 60000) % 60,
    s: Math.floor(ms / 1000) % 60,
  };

  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map((val) => val[1] + val[0])
    .join(" ");
}

function formatName(name: string) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

export { formatBytes, formatDuration, formatName };
