import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import DiaryEditorForm from "../components/DiaryEditorForm";

export default function DiaryEditPage({ user, isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Layout user={user}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#5c3a3a]">
            {isEdit ? "Edit Diary" : "Add Your Journal"}
          </h1>
          <p className="mt-2 text-sm text-[#8b6870]">
            Write down your thoughts, feelings, and little magical moments.
          </p>
        </div>

        <DiaryEditorForm
          diaryId={id}
          isEdit={isEdit}
          onCancel={() => navigate("/diary")}
          onSaved={() => navigate("/diary")}
        />
      </div>
    </Layout>
  );
}
