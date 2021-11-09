export type ButtonProps = {
  text?: string;
  onClick: () => void;
  disabled?: boolean;
  view?: 'default' | 'primary' | 'secondary';
  loading?: boolean;
};
