export async function uploadFile(formData: FormData) {
  const res = await fetch("/api/files/upload", {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function deleteFileByPublicUrl(publicUrl: string) {
  const res = await fetch("/api/files/delete-by-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicUrl }),
  });

  return res.json();
}