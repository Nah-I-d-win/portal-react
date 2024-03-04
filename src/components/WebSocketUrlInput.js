import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const WebSocketUrlInput = ({ tempWsUrl, setTempWsUrl, applyWsUrl, }) => (_jsxs("div", { className: "my-4", children: [_jsx("input", { type: "text", placeholder: "Enter WebSocket URL", value: tempWsUrl, onChange: (e) => setTempWsUrl(e.target.value), className: "text-white" }), _jsx("button", { onClick: applyWsUrl, className: "ml-2", children: "Apply URL" })] }));
export default WebSocketUrlInput;
