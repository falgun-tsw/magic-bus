import React from "react";

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
    const handleToggle = () => {
        onChange(!checked);
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={handleToggle}
            />
            <div
                className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full 
                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                    after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 ${
                        checked 
                        ? "bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"
                        : "after:translate-x-0"
                    }`}
            />
        </label>
    );
};

export default ToggleSwitch;
