import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

type Command = "zrange" | "sismember" | "get" | "smember" | "hgetall";

const upstashRedisUrl = process.env.UPSTASH_REDIS_URL;
const upstashRedisToken = process.env.UPSTASH_REDIS_TOKEN;

export const fetchRedis = async (
  command: Command,
  ...args: (string | number)[]
) => {
  const commandUrl = `${upstashRedisUrl}/${command}/${args.join("/")}`;

  const res = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${upstashRedisToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Redis Error: ${res.statusText}`);
  }

  const data = await res.json();
  return data.result;
};
