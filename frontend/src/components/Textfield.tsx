import React from 'react';


interface TextfieldProps{
    type: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void
}

const Textfield: React.FC<TextfieldProps> = ({ type, placeholder, value, onChange }) => {
  //clearing input function
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative w-full">
      {/* input */}
      <input
        type={type}
        placeholder={placeholder}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
        onClick={handleClear}
        className="absolute right-3 top-1/2 -translate-y-1/2 transform bg-white hover:text-gray-700 p-1 rounded focus:outline-none border-none shadow-none"
      >X
        </button>
      )}
    </div>
  );
};

export default Textfield;
