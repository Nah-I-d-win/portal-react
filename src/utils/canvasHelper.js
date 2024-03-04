export function startPoint(range, server, width, height) {
    const x = ((range.min.x - server.range.min.x) /
        (server.range.max.x - server.range.min.x)) *
        width;
    const y = ((range.min.y - server.range.min.y) /
        (server.range.max.y - server.range.min.y)) *
        height;
    return [x, y];
}
export async function saveCanvasAsImage(canvas, url) {
    if (!canvas)
        return;
    const imageDataUrl = canvas.toDataURL("image/png");
    const base64ImageContent = imageDataUrl.split(",")[1];
    const body = JSON.stringify({
        imageData: base64ImageContent,
    });
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        console.log("Image uploaded successfully:", jsonResponse);
    }
    catch (error) {
        console.error("Error uploading image:", error);
    }
}
