export const CheckboxOption = ({ id, name, value, label, checked, onChange }) => (
  <label
    htmlFor={id}
    className="flex items-center space-x-3 text-sm cursor-pointer"
  >
    <input
      type="checkbox"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-600 bg-gray-800 accent-yellow-500 focus:ring-yellow-500"
    />
    <span className={checked ? 'text-yellow-500' : 'text-gray-300'}>
      {label}
    </span>
  </label>
);

// --- RadioOption component (for Sort By) ---
export const RadioOption = ({ id, name, value, label, checked, onChange }) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center space-x-3 text-sm cursor-pointer"
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 border-gray-600 bg-gray-800 accent-yellow-500 focus:ring-yellow-500"
      />
      <span className={checked ? 'text-yellow-500' : 'text-gray-300'}>
        {label}
      </span>
    </label>
  );
};