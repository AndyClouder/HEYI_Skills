import { useParams } from 'react-router-dom';
import { mockCases } from '@/services/mockData';
import { Button } from '@/components/ui/Button';
import { Download, Heart, MessageSquare, Eye } from 'lucide-react';

export function CaseDetailPage() {
  const { id } = useParams();
  const caseItem = mockCases.find((c) => c.case_id === id);

  if (!caseItem) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          案例不存在
        </h1>
        <p className="text-gray-500">抱歉，您访问的案例不存在或已被下架。</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-primary">
          首页
        </a>
        <span className="mx-2">/</span>
        <a href="/explore" className="hover:text-primary">
          案例广场
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{caseItem.title}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Cover */}
          <div className="w-full sm:w-48 h-32 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-5xl shrink-0">
            📦
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {caseItem.title}
            </h1>
            <p className="text-gray-600 mb-4">{caseItem.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {caseItem.tags?.map((tag) => (
                <span
                  key={tag.tag_id}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag.tag_name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {caseItem.view_count} 浏览
              </span>
              <span className="flex items-center gap-1">
                <Download size={14} />
                {caseItem.download_count} 下载
              </span>
              <span className="flex items-center gap-1">
                <Heart size={14} />
                {caseItem.like_count} 点赞
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare size={14} />
                {caseItem.comment_count} 评论
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
          <Button size="lg" className="flex items-center gap-2">
            <Download size={18} />
            下载案例
          </Button>
          <Button variant="secondary" size="lg">
            <Heart size={18} className="mr-2" />
            点赞
          </Button>
          <Button variant="secondary" size="lg">
            <MessageSquare size={18} className="mr-2" />
            收藏
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">使用说明</h2>
        <p className="text-gray-600 leading-relaxed">
          本案例使用 {caseItem.package_format} 格式打包，可直接导入到
          Claude Code 中使用。
          <br />
          <br />
          1. 下载案例压缩包
          <br />
          2. 解压到本地目录
          <br />
          3. 在 Claude Code 中导入技能包
          <br />
          4. 根据说明文档开始使用
        </p>
      </div>

      {/* Author */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">作者信息</h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
            {caseItem.author?.nickname?.[0] || 'U'}
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {caseItem.author?.nickname || '匿名'}
            </div>
            <div className="text-sm text-gray-500">
              {caseItem.author?.role === 'student' && '学员'}
              {caseItem.author?.role === 'tutor' && '导师'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
