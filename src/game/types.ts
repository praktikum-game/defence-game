export type EndGameStatus = 'win' | 'lose';
export type EndGameCallback = (typeEnd: EndGameStatus) => void;

// Объект для хранения загруженных изображений: ключ - урл изображения, значение - Image
export type GameResoursesType = {
  [key: string]: HTMLImageElement;
};

// объект для хранения путей ко всем изображениям/ресурсам игры
export type ResourcesObjectType = {
  [key: string]: Record<string, { image?: string; icon?: string }>;
};
