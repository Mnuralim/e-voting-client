interface Props {
  name: string;
  value: string | number;
  options: { id: string | number; name: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export const SelectField = ({
  name,
  value,
  options,
  onChange,
  required = false,
}: Props) => (
  <div className="mb-4">
    <label className="block mb-2">{name}</label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border rounded peer text-black"
    >
      <option value={"select"} disabled>
        Select {name}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
    <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
      {name} is required
    </p>
  </div>
);
