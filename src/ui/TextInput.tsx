type TextInputProps = {
  label: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

export default function TextInput({
  label,
  id,
  placeholder = "",
  value,
  onChange,
  type = "text",
}: TextInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-slate-700 text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        className="border border-slate-300 p-1 rounded-sm text-sm text-slate-800 placeholder:text-slate-400 outline-0 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
