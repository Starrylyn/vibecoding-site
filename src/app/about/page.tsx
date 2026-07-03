import { Metadata } from 'next';
import SketchHeader from '@/components/SketchHeader';
import SketchFooter from '@/components/SketchFooter';

export const metadata: Metadata = {
  title: '关于',
  description:
    '关于 Vibecoding 实践分享——一个记录代码生成艺术实践的个人站点。',
};

export default function AboutPage() {
  return (
    <>
      <SketchHeader />
      <main className="sketch-layout sketch-fade-in">
        <h1 className="sketch-article-title" style={{ marginBottom: '1.5rem' }}>
          关于
        </h1>

        <p className="sketch-about-intro">
          这个站点记录我在 vibecoding 领域的实践、思考和工具探索。
          每一篇文章都是真实的编码经历——有成功的喜悦，也有踩坑的教训。
        </p>

        <div className="sketch-about-section">
          <h3>// 什么是 Vibecoding</h3>
          <p>
            Vibecoding 是一种用自然语言描述编程意图、由 AI 生成代码的开发范式。
            它不是"让 AI 替你写代码"，而是将编程的抽象层级提升到意图描述的层面——
            你专注于 <strong>想要什么</strong> 以及 <strong>为什么</strong>，
            AI 负责 <strong>怎么做</strong> 的细节实现。
          </p>
          <p>
            这就像从手动挡换到自动挡：核心的驾驶判断依然在你手中，
            但换挡的机械操作被自动化了。
          </p>
        </div>

        <div className="sketch-about-section">
          <h3>// 设计哲学</h3>
          <p>
            本站的设计灵感来自 <strong>Zach Lieberman</strong> 的代码生成艺术——
            纯黑白、手绘构造线、可视化的工作过程。
            这些视觉元素直接呼应 vibecoding 的本质：<em>编程即绘画，代码即艺术</em>。
          </p>
          <p>
            你会在页面中看到网格点、构造标记、草稿线等元素——
            这些都是"过程可见化"的尝试，就像创作者的草稿本摊开在你面前。
          </p>
        </div>

        <div className="sketch-about-section">
          <h3>// 技术栈</h3>
          <ul>
            <li><strong>框架</strong>：Next.js (App Router)</li>
            <li><strong>样式</strong>：手写 CSS（无框架依赖）</li>
            <li><strong>内容</strong>：Markdown + gray-matter + remark</li>
            <li><strong>部署</strong>：Vercel（静态导出）</li>
          </ul>
        </div>

        <div className="sketch-about-section">
          <h3>// 关于我</h3>
          <p>
            一个在 AI 辅助编程的世界里不断探索的开发者。
            不追求"替代"，只追求"增强"。
          </p>
          <p>
            如果你也在实践 vibecoding，欢迎交流心得。
            可以通过 GitHub Issues 提交讨论或建议。
          </p>
        </div>
      </main>
      <SketchFooter />
    </>
  );
}
