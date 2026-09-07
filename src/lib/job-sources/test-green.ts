import { GreenhouseSource } from "./greenhouse";

async function main() {
  const source = new GreenhouseSource(
    "modoenergy",
    "Modo Energy"
  );

  const jobs = await source.fetchJobs();

  console.log(`Found ${jobs.length} jobs`);

  console.dir(jobs, {
    depth: null,
  });
}

main().catch(console.error);