import { Skill } from "@domain/skill/skill";
import { StrapiClient } from "@infra/strapi/StrapiClient";
import { StrapiSvg } from "@util/DTOs/StrapiSvg";
import type { Locale } from "@util/types/Locale";
import { LocalizedStrapiRepo } from "@util/types/LocalizedStrapiRepo";

class StrapiRepo extends LocalizedStrapiRepo<Skill> {
  override async getAll(locale: Locale): Promise<Skill[]> {
    const res = await StrapiClient.GetSkills({ locale });

    const skills =
      res.skills?.data.map((rawSkill) => {
        const { locale, name, proficiency, summary, svg, url } =
          rawSkill.attributes!;

        return new Skill(
          rawSkill.id!,
          locale as Locale,
          name,
          proficiency,
          summary,
          url,
          svg?.data?.attributes?.url
            ? new StrapiSvg(svg.data?.attributes?.url)
            : undefined
        );
      }) ?? [];

    return skills;
  }
}

export const SkillStrapiRepo = new StrapiRepo();