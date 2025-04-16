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
    <label className="block text-white text-sm font-medium mb-2">
      {name}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-3 border-[3px] border-[#111111] rounded-none bg-white text-[#111111] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFFF00] transition-all shadow-[3px_3px_0px_#111111]"
      required={required}
    />
    {required && !value && (
      <p className="mt-1 text-sm text-red-500">{name} wajib diisi</p>
    )}
  </div>
);
