interface IAccessToken {
  status: string;
}

interface IFaculty {
  id: string;
  name: string;
}

interface IProgram {
  id: string;
  name: string;
}

interface IStudent {
  id: string;
  nim: string;
  name: string;
  email: string;
  program_id: string;
  faculty_id: string;
  createdAt: string;
  accessToken: IAccessToken;
  faculty: IFaculty;
  program: IProgram;
}

interface FormField {
  type: "text" | "email" | "textarea" | "select" | "file";
  name: string;
  label: string;
  value?: string | number | readonly string[];
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  accept?: string;
  preview?: string;
}

interface FormProps {
  title: string;
  fields: FormField[];
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onButtonClick?: () => void;
  buttonText?: string;
  loading?: boolean;
  showButton?: boolean;
  transactionButton?: React.ReactNode;
}
