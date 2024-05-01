import React from "react";

interface InputGroupProps {
  value: string;
  onChangInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValues?: string;
  defVal?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  value,
  onChangInputHandler,
  inputValues,
  defVal,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={`${value}`}
        className="block text-sm font-medium text-gray-700 capitalize"
      >
        {value}
      </label>
      <input
        type="text"
        id={`${value}`}
        name={`${value}`}
        className="mt-1 p-2 w-full border rounded-md"
        placeholder={`your ${value}`}
        required
        // onChange={(e) => setFullName(e.target.value)}
        onChange={onChangInputHandler}
        value={inputValues}
        defaultValue={`${defVal}`}
      />
    </div>
  );
};

export default InputGroup;
