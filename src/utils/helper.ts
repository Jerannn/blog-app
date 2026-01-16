export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function capitalizeFirstLetter(str: string) {
  if (!str.length) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
}
