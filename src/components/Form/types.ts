export type FormOwnProps = {
  children?: React.ReactNode;
  className?: string;
  onFormSubmit: (formData: FormData) => void;
};

export type FormProps = FormOwnProps;
