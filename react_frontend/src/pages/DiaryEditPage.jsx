import { useParams } from "react-router-dom";
import DiaryBookPage from "./DiaryBookPage";

export default function DiaryEditPage({ authReady, isEdit = false }) {
  const { id } = useParams();

  return <DiaryBookPage authReady={authReady} diaryId={id} isEdit={isEdit} forceEditor />;
}
