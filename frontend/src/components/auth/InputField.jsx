export default function InputField({ label, id, type = "text", placeholder, register, error, rightElement }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
          } ${rightElement ? "pr-10" : ""}`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}