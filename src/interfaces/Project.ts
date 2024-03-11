import type { RawStrapiCollection } from "@infra/Strapi";
import { ProjectLink } from "@interfaces/ProjectLink";
import { SkillFactory, type Skill } from "@interfaces/Skill";
import { StrapiImage } from "@interfaces/StrapImage";
import type { Locale } from "@util/Locale";
import { LocalizedStrapiCollectionFactory } from "@util/StrapiCollectionFactory";

export interface Project {
  locale: Locale;
  headerImage: StrapiImage;
  seoImage: StrapiImage;
  title: string;
  slug: string;
  seoTitle: string;
  startDate: Date;
  endDate: Date;
  workHours: number;
  projectUrl: string;
  tldr: string;
  summary: string;
  links: ProjectLink[];
  technologies: Skill[];
}

export class ProjectFactory extends LocalizedStrapiCollectionFactory<Project> {
  readonly ENDPOINT = "projects";
  parseFromRawCollection(rawCollection: RawStrapiCollection): Project {
    const {
      locale,
      header_image,
      seo_image,
      title,
      slug,
      seo_title,
      start,
      end,
      work_hours,
      url,
      tldr,
      summary,
      links,
      technologies,
    } = rawCollection.attributes;

    const headerImage = new StrapiImage();
    const seoImage = new StrapiImage();

    const startDate = new Date(start);
    const endDate = new Date(end);

    const linksArray = links?.data.map((link: RawStrapiCollection) => {
      return new ProjectLink();
    });

    const technologiesArray = technologies?.data.map(
      (tech: RawStrapiCollection) => {
        return new SkillFactory().parseFromRawCollection(tech);
      }
    );

    return {
      locale,
      headerImage,
      seoImage,
      title,
      slug,
      seoTitle: seo_title,
      startDate,
      endDate,
      workHours: work_hours,
      projectUrl: url,
      tldr,
      summary,
      links: linksArray,
      technologies: technologiesArray,
    };
  }
}
