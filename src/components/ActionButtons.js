import { jsx as _jsx } from "react/jsx-runtime";
const ActionButtons = ({ actions, loading, handleAction, }) => {
    return (_jsx("div", { className: "flex flex-wrap gap-2", children: actions.map(({ label, actionType, direction }) => (_jsx("button", { disabled: loading, onClick: () => handleAction(actionType, direction), className: `px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ${loading ? "opacity-50 cursor-not-allowed" : ""}`, children: label }, `${actionType}-${direction}`))) }));
};
export default ActionButtons;
