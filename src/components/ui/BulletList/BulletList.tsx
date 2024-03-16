import clsx from "clsx";
import type { ReactElement } from "react";

export interface BulletListProps {
  children: ReactElement<HTMLLIElement> | ReactElement<HTMLLIElement>[];
  hideBullets?: boolean;
  id?: string;
}

export const BulletList = ({
  children,
  hideBullets,
  id,
}: Readonly<BulletListProps>) => (
  <ul
    id={id}
    className={clsx("flex flex-col gap-2", !hideBullets && "ml-6 list-disc")}
  >
    {children}
  </ul>
);