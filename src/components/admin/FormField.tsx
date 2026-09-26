export function FormField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-dark">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-dark/50">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-dark/15 px-3 py-2 text-sm outline-none focus:border-ocean";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={inputClass} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={inputClass} />;
}

export function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-dark">
      <input type="checkbox" {...props} className="h-4 w-4 rounded border-dark/30" />
      {label}
    </label>
  );
}
