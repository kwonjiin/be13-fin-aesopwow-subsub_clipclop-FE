interface InputTextBoxProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
}

export function InputTextBox({
  type,
  placeholder,
  value,
  onChange,
  width = "w-full",
}: InputTextBoxProps) {
  return (
    <div className={`flex flex-col gap-1 ${width}`}>
      <label className="text-sm font-medium border-gray-300 text-gray-700"></label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border bg-[#fffff9] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9c7866] focus:border-transparent"
      />
    </div>
  );
}
