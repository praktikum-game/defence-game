export type EndGameStatus = 'win' | 'lose';
export type EndGameCallback = (typeEnd: EndGameStatus) => void;
export type GameResoursesType = {
  [key: string]: HTMLImageElement;
};
