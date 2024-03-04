import React from "react";

export interface ActionButton {
    label: string;
    actionType: "move" | "cycle" | "palette";
    direction: string;
}

interface ActionButtonsProps {
    actions: ActionButton[];
    loading: boolean;
    handleAction: (
        actionType: "move" | "cycle" | "palette",
        direction: string,
    ) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    actions,
    loading,
    handleAction,
}) => {
    return (
        <div className="flex flex-wrap gap-2">
            {actions.map(({ label, actionType, direction }) => (
                <button
                    key={`${actionType}-${direction}`}
                    disabled={loading}
                    onClick={() => handleAction(actionType, direction)}
                    className={`px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default ActionButtons;
