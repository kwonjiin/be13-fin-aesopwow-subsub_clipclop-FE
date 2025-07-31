// src/presentation/components/organisms/QnaForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';

export default function QnaForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { writePost } = useQnaViewModel();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writePost(title, content);
      alert('문의가 등록되었습니다.');
      navigate('/qna');
    } catch (error) {
      // console.error('❗ 문의 등록 오류:', error);
      alert('문의 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0e5] flex justify-center items-start py-16 px-4">
      <div className="bg-white w-full max-w-5xl p-10 rounded shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">문의사항 작성</h2><br />
          <div className="space-x-2">
            <button
              onClick={handleSubmit}
              className="bg-[#9c7866] text-white px-4 py-1 rounded hover:bg-[#9c7866]"
            >
              등록
            </button>
            <button
              onClick={() => navigate('/qna')}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              취소
            </button>
          </div>
        </div>
        <br />
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={12}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </form>
      </div>
    </div>
  );
}
