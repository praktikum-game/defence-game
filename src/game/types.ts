export type EndGameStatus = 'win' | 'lose';
export type EndGameCallback = (typeEnd: EndGameStatus) => void;

// Объект для хранения загруженных изображений: ключ - урл изображения, значение - Image
export type GameResoursesType = {
  [key: string]: HTMLImageElement;
};

export type ResObjectItemType = Record<string, { image?: string; icon?: string }>;

// объект для хранения путей ко всем изображениям/ресурсам игры
export type ResourcesObjectType = Record<string, ResObjectItemType | string>;
