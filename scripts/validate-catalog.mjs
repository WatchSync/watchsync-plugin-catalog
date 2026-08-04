import { readFile } from "node:fs/promises";

const catalog = JSON.parse(await readFile(new URL("../catalog.json", import.meta.url), "utf8"));
if (catalog?.format !== "watchsync-plugin-catalog/v1")
  throw new Error("Unsupported catalog format");
if (!catalog.generatedAt || Number.isNaN(Date.parse(catalog.generatedAt)))
  throw new Error("generatedAt must be an ISO date");
if (!Array.isArray(catalog.plugins)) throw new Error("plugins must be an array");
const releases = new Set();
for (const [index, plugin] of catalog.plugins.entries()) {
  for (const field of ["pluginId", "version", "displayName", "description", "publisher", "packageUrl"])
    if (typeof plugin?.[field] !== "string" || !plugin[field].trim())
      throw new Error(`plugins[${index}].${field} is required`);
  const packageUrl = new URL(plugin.packageUrl);
  if (packageUrl.protocol !== "https:" || packageUrl.username || packageUrl.password)
    throw new Error(`plugins[${index}].packageUrl must be a safe HTTPS URL`);
  if (!Array.isArray(plugin.capabilities) || typeof plugin.verified !== "boolean")
    throw new Error(`plugins[${index}] has invalid capabilities or verified flag`);
  if (plugin.sha256 && !/^[a-f0-9]{64}$/.test(plugin.sha256))
    throw new Error(`plugins[${index}].sha256 is invalid`);
  const release = `${plugin.pluginId}@${plugin.version}`;
  if (releases.has(release)) throw new Error(`Duplicate release ${release}`);
  releases.add(release);
}
console.log(`Catalog valid: ${catalog.plugins.length} plugin release(s)`);
