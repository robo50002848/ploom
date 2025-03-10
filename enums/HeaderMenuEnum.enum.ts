export enum HeaderMenuEnum {
    WHY_PLOOM,
    SHOP,
    PLOOM_CLUB,
    SUPPORT,
    BLOG,
    SPECIAL_OFFERS
}

export const HeaderMenuText: Record<HeaderMenuEnum, { PL: string; EN: string }> = {
    [HeaderMenuEnum.WHY_PLOOM]: { PL: "Dlaczego Ploom", EN: "Why Ploom" },
    [HeaderMenuEnum.SHOP]: { PL: "Sklep", EN: "Shop" },
    [HeaderMenuEnum.PLOOM_CLUB]: { PL: "Ploom Club", EN: "Ploom Club" },
    [HeaderMenuEnum.SUPPORT]: { PL: "Wsparcie", EN: "Support" },
    [HeaderMenuEnum.BLOG]: { PL: "Blog", EN: "Blog" },
    [HeaderMenuEnum.SPECIAL_OFFERS]: { PL: "Oferty Specjalne", EN: "Special Offers" }
};