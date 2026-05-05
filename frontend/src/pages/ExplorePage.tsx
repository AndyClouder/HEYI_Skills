import { CaseCard } from '@/components/business/CaseCard';
import { mockCases } from '@/services/mockData';

export function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">案例广场</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCases.map((caseItem) => (
          <CaseCard key={caseItem.case_id} case_={caseItem} />
        ))}
      </div>
    </div>
  );
}
