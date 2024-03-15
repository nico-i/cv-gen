import type { Locale } from "@util/types/Locale";
import { LocalizedStrapiCollection } from "@util/types/LocalizedStrapiCollection";

export class Volunteer extends LocalizedStrapiCollection {
  public start: Date;
  public end?: Date;

  constructor(
    id: string,
    locale: Locale,
    public activity: string,
    public org: string,
    start: string,
    end?: string,
    public url?: string,
    public summary?: string,
    public docUrl?: string
  ) {
    super(id, locale);
    this.start = new Date(start);
    if (end) this.end = new Date(end);
  }
}