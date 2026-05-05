import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CaseCard } from '@/components/business/CaseCard';
import { CategoryCard } from '@/components/business/CategoryCard';
import { AuthorCard } from '@/components/business/AuthorCard';
import { mockCases, mockCategories, mockUsers } from '@/services/mockData';
import { useCaseStore } from '@/stores/caseStore';
import { useEffect } from 'react';

export function HomePage() {
  const { setFeaturedCases, setCategories } = useCaseStore();

  useEffect(() => {
    // 初始化数据 (实际项目中从 API 获取)
    setFeaturedCases(mockCases.filter((c) => c.is_featured));
    setCategories(mockCategories);
  }, [setFeaturedCases, setCategories]);

  const featuredCases = mockCases.filter((c) => c.is_featured);
  const activeAuthors = mockUsers.map((u) => ({
    ...u,
    caseCount: Math.floor(Math.random() * 8) + 1,
    downloadCount: Math.floor(Math.random() * 1000) + 200,
  }));

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-purple-600 text-white">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              animation: 'bgMove 20s linear infinite',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium mb-6">
            <Sparkles size={16} />
            <span>合一AI效能实验室官方平台</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            发现优质AI技能
            <br />
            助力高效学习成长
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            汇集学员优秀AI案例，支持OpenClaw/Claude Code格式
            <br />
            一键下载导入，快速提升AI应用能力
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="px-8 py-3 rounded-full bg-white text-primary font-semibold hover:bg-gray-100 transition-all hover:scale-105"
            >
              浏览案例
            </Link>
            <Link
              to="/intro"
              className="px-8 py-3 rounded-full bg-white/15 backdrop-blur-sm font-semibold hover:bg-white/25 transition-all border border-white/30"
            >
              了解更多
            </Link>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">
              1,234
            </div>
            <div className="text-sm text-gray-500 mt-1">优质案例</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">
              5,678
            </div>
            <div className="text-sm text-gray-500 mt-1">注册学员</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">
              45.6K
            </div>
            <div className="text-sm text-gray-500 mt-1">累计下载</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-500 mt-1">好评率</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            📂 按分类浏览
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {mockCategories.map((category) => (
            <CategoryCard key={category.tag_id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            ⭐ 精选案例
          </h2>
          <Link
            to="/explore"
            className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            查看更多 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCases.map((caseItem) => (
            <CaseCard key={caseItem.case_id} case_={caseItem} featured />
          ))}
        </div>
      </section>

      {/* Active Authors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            👨‍🏫 活跃作者
          </h2>
          <Link
            to="/authors"
            className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            查看全部 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {activeAuthors.slice(0, 6).map((author) => (
            <AuthorCard key={author.user_id} author={author} />
          ))}
        </div>
      </section>
    </div>
  );
}
