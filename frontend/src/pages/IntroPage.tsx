import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Upload, Download, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const features = [
  {
    icon: Sparkles,
    title: '优质内容',
    description: '汇集学员优秀AI案例，由导师审核把关，确保内容质量',
  },
  {
    icon: Upload,
    title: '便捷上传',
    description: '简单三步完成案例上传，支持OpenClaw/Claude Code格式',
  },
  {
    icon: Download,
    title: '一键导入',
    description: '下载后可直接导入到Claude Code中，快速上手使用',
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '所有案例经过安全扫描，确保无恶意代码和敏感信息',
  },
];

const steps = [
  {
    number: '01',
    title: '浏览案例',
    description: '在案例广场浏览各种优质AI案例，按分类筛选找到你需要的',
  },
  {
    number: '02',
    title: '下载导入',
    description: '点击下载按钮获取案例包，解压后导入到Claude Code',
  },
  {
    number: '03',
    title: '开始使用',
    description: '根据案例说明文档，快速掌握使用方法，提升AI应用能力',
  },
];

export function IntroPage() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-secondary to-purple-600 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            学员案例库
          </h1>
          <p className="text-xl text-white/90 mb-8">
            合一AI效能实验室官方案例分享平台
            <br />
            助力学员AI技能学习与成长
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                浏览案例
              </Button>
            </Link>
            <Link to="/upload">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                上传案例
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            平台特色
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            我们致力于打造一个高质量的AI案例分享平台，帮助学员快速提升AI应用能力
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              使用流程
            </h2>
            <p className="text-gray-500">
              简单三步，即可开始使用优质AI案例
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/10 absolute -top-4 -left-2">
                  {step.number}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            开始你的AI学习之旅
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            加入合一AI效能实验室，与众多学员一起探索AI的无限可能
          </p>
          <Link to="/explore">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              立即开始
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
