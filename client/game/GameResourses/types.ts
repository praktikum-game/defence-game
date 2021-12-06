export type GameResoursesType = Record<string, HTMLImageElement>;
export type ResourceObjectItemType = Record<string, { image?: string; icon?: string }>;

/** объект для хранения путей ко всем изображениям/ресурсам игры */
export type ResourcesObjectType = Record<string, ResourceObjectItemType | string>;
