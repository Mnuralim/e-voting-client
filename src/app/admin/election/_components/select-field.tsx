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
  console.log(value),
  (
    <div className="mb-4">
      <label className="block text-white text-sm font-medium mb-2">
        {name}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value === null ? "" : value}
        onChange={onChange}
        className="w-full p-3 border-[3px] border-[#111111] rounded-none bg-white text-[#111111] appearance-none focus:outline-none focus:ring-2 focus:ring-[#FFFF00] transition-all shadow-[3px_3px_0px_#111111]"
        required={required}
      >
        <option value="" disabled>
          Select {name}
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            value={
              name === "Fakultas" ||
              name === "Program Studi" ||
              name === "Jurusan" ||
              name === "DPM"
                ? option.name
                : option.id
            }
          >
            {option.name}
          </option>
        ))}
      </select>
      {required && (value === null || value === "") && (
        <p className="mt-1 text-sm text-red-500">{name} wajib diisi</p>
      )}
    </div>
  )
);
