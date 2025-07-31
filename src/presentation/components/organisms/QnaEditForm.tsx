// src/presentation/components/organisms/QnaEditForm.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';
import { useUserStore } from '@/application/stores/UserStore';
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader"


export default function QnaEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedPost, comment, loadOne, loadComment, updatePost } = useQnaViewModel();
  const { userNo: currentUserNo } = useUserStore.getState();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const postId = parseInt(id, 10);
      loadOne(postId);
      loadComment(postId);
    }
  }, [id]);

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setContent(selectedPost.content);
    }
  }, [selectedPost]);

  if (!selectedPost) return <DotWaveLoader color="black" />;

  const isAuthor = selectedPost.userNo === currentUserNo;
  const hasAnswer = !!comment;

  if (!isAuthor || hasAnswer) {
    return (
      <div className="text-red-600 font-semibold">
        {hasAnswer
          ? '이미 관리자 답변이 등록된 글은 수정할 수 없습니다.'
          : '작성자 본인만 수정할 수 있습니다.'}
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || trimmedTitle.length < 2) {
      alert('제목은 최소 2자 이상 입력해주세요.');
      return;
    }

    if (!trimmedContent || trimmedContent.length < 10) {
      alert('내용은 최소 10자 이상 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePost(selectedPost.qnaPostNo, trimmedTitle, trimmedContent);
      alert('수정이 완료되었습니다.');
      navigate(`/qna/${selectedPost.qnaPostNo}`);
    } catch (error) {
      // console.error('❗수정 실패:', error);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0e5] flex justify-center items-start py-16 px-4">
      <div className="bg-white w-full max-w-5xl p-10 rounded shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">문의사항 수정</h2>
          <div className="space-x-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-1 rounded text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#786051] hover:bg-[#9c7866]'
                }`}
            >
              {isSubmitting ? '수정 중...' : '수정'}
            </button>
            <button
              onClick={() => navigate('/qna')}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              취소
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="제목을 입력하세요"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring focus:border-blue-500"
            placeholder="내용을 입력하세요"
            required
          />
        </form>
      </div>
    </div>
  );
}