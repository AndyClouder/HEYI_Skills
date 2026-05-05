import { Link } from 'react-router-dom';

const footerLinks = {
  platform: [
    { label: '首页', path: '/' },
    { label: '案例广场', path: '/explore' },
    { label: '上传案例', path: '/upload' },
    { label: '优秀作者', path: '/authors' },
  ],
  help: [
    { label: '导入教程', path: '/help/import' },
    { label: '上传指南', path: '/help/upload' },
    { label: '常见问题', path: '/help/faq' },
    { label: '联系我们', path: '/contact' },
  ],
  about: [
    { label: '关于我们', path: '/about' },
    { label: '使用条款', path: '/terms' },
    { label: '隐私政策', path: '/privacy' },
    { label: '意见反馈', path: '/feedback' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold text-primary mb-3">
              学员案例库
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              合一AI效能实验室官方案例分享平台，助力学员AI技能学习与成长。
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              平台
            </h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              帮助
            </h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              关于
            </h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-8 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            © 2024 学员案例库 · 版本 1.2.0 · 合一AI效能实验室
          </p>
        </div>
      </div>
    </footer>
  );
}
