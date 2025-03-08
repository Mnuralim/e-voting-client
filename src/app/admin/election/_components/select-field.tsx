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
    <label className="block mb-2 text-sm font-medium text-gray-300">
      {name}
      {required && <span className="text-[#FFFF00]">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 border border-gray-700 rounded-lg bg-[#222222] text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent transition-all"
    >
      <option value={"select"} disabled>
        Select {name}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id} className="bg-[#222222]">
          {option.name}
        </option>
      ))}
    </select>
    <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
      {name} is required
    </p>
  </div>
);
