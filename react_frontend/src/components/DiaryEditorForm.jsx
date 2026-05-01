import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, ChevronDown, ChevronUp, Eye, ImagePlus, PenLine, Save, Trash2 } from "lucide-react";
import { apiFetch } from "../api";

export default function DiaryEditorForm({
  diaryId = null,
  isEdit = false,
  onCancel,
  onSaved,
  compact = false,
}) {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [mode, setMode] = useState("write");
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDate("");
    setContent("");
    setImages([]);
    setExistingImages([]);
    setMode("write");
    setPreviewHtml("");
    setError("");

    if (!isEdit || !diaryId) return;
    apiFetch(`/api/diaries/${diaryId}/`)
      .then((data) => {
        setDate(data.date ?? "");
        setContent(data.content ?? "");
        setExistingImages(data.images ?? []);
      })
      .catch((err) => setError(err.message || "Failed to load diary."));
  }, [diaryId, isEdit]);

  useEffect(() => {
    if (mode !== "preview") return;
    setPreviewLoading(true);
    apiFetch("/api/markdown/preview/", {
      method: "POST",
      body: JSON.stringify({ content }),
    })
      .then((data) => setPreviewHtml(data.html ?? ""))
      .catch((err) => setError(err.message || "Failed to render preview."))
      .finally(() => setPreviewLoading(false));
  }, [content, mode]);

  const imagePreviews = Array.from(images).map((file, index) => ({
    key: `${file.name}-${file.lastModified}-${index}`,
    name: file.name,
    url: URL.createObjectURL(file),
  }));

  const updateImageCaption = (imageId, caption) => {
    setExistingImages((current) =>
      current.map((image) =>
        image.id === imageId ? { ...image, caption } : image
      )
    );
  };

  const moveImage = (imageId, direction) => {
    setExistingImages((current) => {
      const next = [...current];
      const index = next.findIndex((image) => image.id === imageId);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((image, order) => ({ ...image, order }));
    });
  };

  const deleteImage = async (imageId) => {
    const confirmed = window.confirm("Delete this photo?");
    if (!confirmed) return;
    setError("");
    try {
      await apiFetch(`/api/diary-images/${imageId}/`, { method: "DELETE" });
      setExistingImages((current) => current.filter((image) => image.id !== imageId));
    } catch (err) {
      setError(err.message || "Failed to delete photo.");
    }
  };

  const syncExistingImages = async () => {
    if (!isEdit || !diaryId || existingImages.length === 0) return;
    await Promise.all(
      existingImages.map((image, order) =>
        apiFetch(`/api/diary-images/${image.id}/`, {
          method: "PATCH",
          body: JSON.stringify({ caption: image.caption ?? "", order }),
        })
      )
    );
    await apiFetch(`/api/diaries/${diaryId}/images/reorder/`, {
      method: "POST",
      body: JSON.stringify({ imageIds: existingImages.map((image) => image.id) }),
    });
  };

  const uploadNewImages = async () => {
    if (!isEdit || !diaryId || images.length === 0) return;
    const payload = new FormData();
    Array.from(images).forEach((image) => {
      payload.append("images", image);
    });

    return apiFetch(`/api/diaries/${diaryId}/images/`, {
      method: "POST",
      body: payload,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      let savedDiary = null;
      if (isEdit) {
        savedDiary = await apiFetch(`/api/diaries/${diaryId}/`, {
          method: "PUT",
          body: JSON.stringify({ date, content }),
        });
        await syncExistingImages();
        if (images.length > 0) {
          savedDiary = await uploadNewImages();
        }
      } else {
        const payload = new FormData();
        payload.append("date", date);
        payload.append("content", content);
        Array.from(images).forEach((image) => {
          payload.append("images", image);
        });

        savedDiary = await apiFetch("/api/diaries/", {
          method: "POST",
          body: payload,
        });
      }
      onSaved?.(savedDiary);
    } catch (err) {
      if (err.message === "Login required") {
        navigate("/login");
        return;
      }
      setError(err.message || "Failed to save diary.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-2xl bg-white shadow-sm ${
        compact ? "p-4 md:p-5" : "p-6 md:p-8"
      }`}
    >
      {error ? <p className="mb-4 text-sm text-[#a8465d]">{error}</p> : null}

      <div className="mb-5">
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#5c3a3a]">
          <CalendarDays className="h-4 w-4" />
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded-3xl border border-[#f1cbd3] bg-[#fffafc] px-4 py-3 outline-none focus:border-[#e8b0b0]"
        />
      </div>

      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <label className="block text-sm font-semibold text-[#5c3a3a]">
            Markdown Content
          </label>
          <div className="inline-flex rounded-full border border-[#f1cbd3] bg-[#fffafc] p-1">
            <button
              type="button"
              onClick={() => setMode("write")}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${mode === "write" ? "bg-[#f4c2c2]" : ""}`}
            >
              <PenLine className="h-3.5 w-3.5" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${mode === "preview" ? "bg-[#f4c2c2]" : ""}`}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
          </div>
        </div>

        {mode === "write" ? (
          <textarea
            rows={compact ? 9 : 12}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={"# 今日の記録\n\n- 気分:\n- メモ:\n\n本文を書く..."}
            className="w-full rounded-3xl border border-[#f1cbd3] bg-[#fffafc] px-4 py-3 outline-none focus:border-[#e8b0b0]"
          />
        ) : (
          <div className="min-h-[320px] rounded-3xl border border-[#f1cbd3] bg-[#fffafc] px-4 py-3">
            {previewLoading ? (
              <p className="text-sm text-[#8b6870]">Rendering preview...</p>
            ) : (
              <div
                className="diary-markdown text-sm leading-7 text-[#5c3a3a]"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            )}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#5c3a3a]">
          <ImagePlus className="h-4 w-4" />
          Photos
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => setImages(event.target.files ?? [])}
          className="w-full rounded-3xl border border-[#f1cbd3] bg-[#fffafc] px-4 py-3 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[#f4c2c2] file:px-4 file:py-2 file:text-[#5c3a3a]"
        />

        {(existingImages.length > 0 || imagePreviews.length > 0) && (
          <div className={`mt-4 grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
            {existingImages.map((image, index) => (
              <div key={image.id} className="rounded-2xl border border-[#f1cbd3] bg-[#fffafc] p-3">
                <img
                  src={image.url}
                  alt={image.caption || "Diary"}
                  className="h-32 w-full rounded-2xl object-cover"
                />
                <input
                  value={image.caption ?? ""}
                  onChange={(event) => updateImageCaption(image.id, event.target.value)}
                  placeholder="Caption"
                  className="mt-3 w-full rounded-full border border-[#f1cbd3] bg-white px-3 py-2 text-sm outline-none"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => moveImage(image.id, -1)}
                    disabled={index === 0}
                    className="inline-flex items-center gap-1 rounded-full border border-[#e8b0b0] bg-white px-3 py-2 text-xs disabled:opacity-40"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(image.id, 1)}
                    disabled={index === existingImages.length - 1}
                    className="inline-flex items-center gap-1 rounded-full border border-[#e8b0b0] bg-white px-3 py-2 text-xs disabled:opacity-40"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteImage(image.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-[#f0b8c3] bg-white px-3 py-2 text-xs text-[#a8465d]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {imagePreviews.map((image) => (
              <div key={image.key} className="rounded-2xl border border-[#f1cbd3] bg-[#fffafc] p-3">
                <img
                  src={image.url}
                  alt={image.name}
                  className="h-32 w-full rounded-2xl object-cover"
                />
                <p className="mt-2 truncate text-xs text-[#8b6870]">{image.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-[#f4c2c2] px-6 py-3 text-sm font-semibold text-[#5c3a3a] transition hover:bg-[#e8b0b0] disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "SAVING..." : isEdit ? "UPDATE" : "SAVE"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-[#e8b0b0] bg-white px-6 py-3 text-sm text-[#5c3a3a]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
