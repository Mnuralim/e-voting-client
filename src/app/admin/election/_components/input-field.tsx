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
    <label className="block mb-2 text-sm font-medium text-gray-300">
      {name}
      {required && <span className="text-[#FFFF00]">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 border border-gray-700 rounded-lg bg-[#222222] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFFF00] focus:border-transparent transition-all"
    />
    <p className="text-red-500 text-sm mt-1 invisible peer-invalid:visible">
      {name} is required
    </p>
  </div>
);
