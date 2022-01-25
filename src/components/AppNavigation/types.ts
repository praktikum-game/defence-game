export type NavigationItem = {
  path: string;
  name: string;
  showFor: {
    signed: boolean;
    anonim: boolean;
  };
  icon?: JSX.Element;
};
