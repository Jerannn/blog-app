type TextAreaProps = {
  label: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function TextArea({
  label,
  id,
  placeholder = "",
  value,
  onChange,
}: TextAreaProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-slate-700 text-sm font-medium">
        {label}
      </label>
      <textarea
        name={id}
        id={id}
        placeholder={placeholder}
        className="max-h-80 border border-slate-300 p-1 rounded-sm text-sm text-slate-800  placeholder:text-slate-400 outline-0 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
