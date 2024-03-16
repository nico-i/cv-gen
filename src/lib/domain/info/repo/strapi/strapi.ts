import { StrapiImage } from "@/lib/DTOs/StrapiImage";
import { StrapiLink } from "@/lib/DTOs/StrapiLink";
import { StrapiSvg } from "@/lib/DTOs/StrapiSvg";
import { Info } from "@/lib/domain/info";
import { StrapiClient } from "@/lib/infra/strapi/StrapiClient";
import type { Locale } from "@/lib/types/Locale";
import { LocalizedStrapiRepo } from "@/lib/types/LocalizedStrapiRepo";

class StrapiRepository extends LocalizedStrapiRepo<Info> {
  override async getAll(locale: Locale): Promise<Info[]> {
    const res = await StrapiClient.GetInfo({ locale });

    const {
      locale: resLocale,
      name,
      phone,
      address,
      dob,
      bio,
      portrait,
      occupation,
      contact,
    } = res.info?.data?.attributes!;

    const portraitAttributes = portrait?.data?.attributes;

    const portraitImage = new StrapiImage(
      portrait.data?.id!,
      portraitAttributes?.width!,
      portraitAttributes?.height!,
      portraitAttributes?.url!,
      portraitAttributes?.formats,
      portraitAttributes?.alternativeText!
    );

    const contacts = await Promise.all(
      contact?.map(
        async (resContact): Promise<StrapiLink> =>
          new StrapiLink(
            resContact?.text!,
            resContact?.url!,
            resContact?.icon?.data?.attributes?.url
              ? await new StrapiSvg(
                  resContact?.icon?.data?.attributes?.url
                ).fetchHtml()
              : undefined
          )
      ) ?? []
    );

    return [
      new Info(
        res.info?.data?.id!,
        resLocale as Locale,
        portraitImage,
        address,
        occupation,
        name,
        phone,
        dob,
        await Promise.all(contacts),
        bio ?? undefined
      ),
    ];
  }
}

export const InfoStrapiRepo = new StrapiRepository();