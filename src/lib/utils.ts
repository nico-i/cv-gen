import { markdown } from "@astropub/md";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchSvgHtml(url: string): Promise<string> {
  const fetchedHtml = await fetch(url).then((res) => res.text());
  // TODO: Remove <title> in CMS instead of here
  return fetchedHtml.replace(/<title>.*<\/title>/, "");
}

export async function parseMdBulletListToHtml(
  resString: string
): Promise<string[]> {
  let resStringNoPrefix = resString.replaceAll("- ", "");

  return await Promise.all(
    resStringNoPrefix.split("\n").map(async (liStr) => {
      const mdStr = await markdown(liStr);
      console.log(mdStr);
      return mdStr.toString();
    })
  );
}
