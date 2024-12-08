import React from "react";

interface DropdownProps {
  value: "Posts" | "Comments";
  onChange: (value: "Posts" | "Comments") => void;
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as "Posts" | "Comments")}
      className="px-4 py-2 border border-gray-300 rounded-md"
    >
      <option value="Posts">Posts</option>
      <option value="Comments">Comments</option>
    </select>
  );
};

export default Dropdown;
