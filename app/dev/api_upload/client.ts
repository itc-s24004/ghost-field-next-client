export async function api_upload(file: File): Promise<boolean> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/dev/api_upload", {
        method: "PUT",
        body: formData,
    });
    
    return response.ok;
}