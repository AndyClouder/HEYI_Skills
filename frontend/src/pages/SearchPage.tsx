import { CaseCard } from '@/components/business/CaseCard';
import { mockCases } from '@/services/mockData';

export function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">搜索结果</h1>
        <p className="text-gray-500">共找到 {mockCases.length} 个相关案例</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCases.map((caseItem) => (
          <CaseCard key={caseItem.case_id} case_={caseItem} />
        ))}
      </div>
    </div>
  );
}
