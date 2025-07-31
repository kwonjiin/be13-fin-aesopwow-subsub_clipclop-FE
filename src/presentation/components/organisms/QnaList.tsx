import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';

const ITEMS_PER_PAGE = 10;

export default function QnaList() {
  const { posts, loadAll, currentPage, setPage } = useQnaViewModel();

  useEffect(() => {
    loadAll();
  }, []);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const pagedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goFirst = () => setPage(1);
  const goLast = () => setPage(totalPages);
  const goPrev = () => currentPage > 1 && setPage(currentPage - 1);
  const goNext = () => currentPage < totalPages && setPage(currentPage + 1);

  return (
    <div className="bg-white rounded-xl shadow-md p-8 w-full">
      {/* 상단 제목 + 글쓰기 */}
      <div className="flex justify-end mb-6">
        <Link
          to="/qna/write"
          className="bg-[#786051] text-white text-sm px-4 py-2 rounded hover:bg-[#9c7866] hover:text-white"
        >
          글쓰기
        </Link>
      </div>

      {/* 게시글 리스트 */}
      <div className="space-y-4">
        {pagedPosts.length === 0 ? (
          <p className="text-gray-500">작성된 문의사항이 없습니다.</p>
        ) : (
          pagedPosts.map((post) => (
            <Link
              to={`/qna/${post.qnaPostNo}`}
              key={post.qnaPostNo}
              className="block rounded-lg p-4 bg-gray-100"
            >
              <div className="font-semibold text-lg text-gray-800">{post.title}</div>
              <div className="text-sm text-gray-500 mt-1">
                {new Date(post.createdAt).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}</div>
            </Link>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6 space-x-1">
        <button
          onClick={goFirst}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30"
        >
          ≪
        </button>
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30"
        >
          ◀
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-3 py-1 border rounded ${
              pageNum === currentPage ? 'bg-[#786051] text-white' : 'bg-white text-gray-800'
            } hover:bg-blue-100`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30"
        >
          ▶
        </button>
        <button
          onClick={goLast}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30"
        >
          ≫
        </button>
      </div>
    </div>
  );
}
