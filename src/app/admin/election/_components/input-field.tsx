interface Props {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const InputField = ({
  type,
  name,
  value,
  onChange,
  required = false,
}: Props) => (
  <div className="mb-4">
    <label className="block mb-2 text-white">{name}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border rounded peer text-black"
    />
    <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
      {name} is required
    </p>
  </div>
);
