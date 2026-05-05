import { mockDashboardStats, mockCategoryStats, mockCases } from '@/services/mockData';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4'];

export function AdminDashboardPage() {
  const recentCases = mockCases.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">管理后台</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardBody className="p-6">
            <div className="text-sm text-gray-500 mb-1">总案例数</div>
            <div className="text-3xl font-bold text-gray-900">
              {mockDashboardStats.total_cases}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-6">
            <div className="text-sm text-gray-500 mb-1">总用户数</div>
            <div className="text-3xl font-bold text-gray-900">
              {mockDashboardStats.total_users}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-6">
            <div className="text-sm text-gray-500 mb-1">累计下载</div>
            <div className="text-3xl font-bold text-gray-900">
              {mockDashboardStats.total_downloads.toLocaleString()}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-6">
            <div className="text-sm text-gray-500 mb-1">待审核</div>
            <div className="text-3xl font-bold text-warning">
              {mockDashboardStats.pending_review}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              分类分布
            </h2>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockCategoryStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) =>
                    `${category} ${percentage}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {mockCategoryStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Upload Trend */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              上传趋势（近7天）
            </h2>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockCategoryStats}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Pending Reviews */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">
            待审核案例
          </h2>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    案例标题
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    作者
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    提交时间
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map((caseItem) => (
                  <tr key={caseItem.case_id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {caseItem.title}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {caseItem.author?.nickname}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(caseItem.create_time).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-sm text-primary hover:underline">
                        审核
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
