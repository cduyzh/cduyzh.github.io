import { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Sparkles, Wrench, MapPin } from 'lucide-react';

export default function About() {
  const [avatarSrc, setAvatarSrc] = useState('/assets/avatar-cduyzh.png');
  const fallbackAvatar = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop';

  const focusPoints = [
    {
      icon: Code2,
      title: 'Web 界面工程',
      desc: '追求确定而细腻的阻尼交互，偏好干净模块化的组件架构。'
    },
    {
      icon: Sparkles,
      title: 'AI 应用与工作流',
      desc: '探索轻量生成式大模型与图形界面的结合，将推理封装为趁手工具。'
    },
    {
      icon: Wrench,
      title: '自用工具与独立实践',
      desc: '从日常真实痛点切入，把闪现的想法敲成可在浏览器与手机上使用的产品。'
    }
  ];

  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-24 md:py-28 bg-[#f4f2ec]/85 backdrop-blur-md text-stone-900 border-t border-b border-stone-200/80"
    >
      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 md:px-12">
        {/* Section Marker */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <span className="text-xs font-mono tracking-widest text-[#c85a32] font-semibold">
            01 / 关于我
          </span>
          <div className="h-[1px] w-10 bg-stone-300" />
          <span className="text-xs font-mono text-stone-500">
            常驻成都 · 个人数字工作室
          </span>
        </div>

        {/* Section Headline & Intro */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900"
          >
            关于我
          </motion.h2>

          {/* User Exact Intro Paragraph with Visual Avatar Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 sm:p-8 rounded-2xl bg-white/85 border border-stone-200/90 shadow-xs backdrop-blur-xs flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-7"
          >
            {/* Visual Avatar / Workspace Vignette */}
            <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-stone-300/80 bg-stone-100 shadow-xs group">
              <img
                src={avatarSrc}
                alt="cduyzh 个人工作台与肖像"
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={() => {
                  if (avatarSrc !== fallbackAvatar) {
                    setAvatarSrc(fallbackAvatar);
                  }
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Intro Copy */}
            <div className="flex-1 flex flex-col gap-3 text-center sm:text-left">
              <p className="text-base sm:text-lg text-stone-800 font-normal leading-relaxed tracking-normal">
                我是 <span className="font-semibold text-stone-950">cduyzh</span>，一名 Web 前端开发者。平时除了工作，也喜欢把一些突然冒出来的想法做成真正可以使用的产品。最近比较关注 AI、Web 应用、自动化工具，以及一些解决自己实际需求的小项目。
              </p>

              {/* Status Meta Chips */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs font-mono text-stone-500">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100/90 border border-stone-200/70 text-stone-700 font-medium">
                  <MapPin size={12} className="text-[#c85a32]" />
                  <span>中国 · 成都</span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-stone-100/90 border border-stone-200/70 text-stone-700 font-medium">
                  Web 界面与全栈探索
                </span>
                <span className="px-2.5 py-1 rounded-md bg-stone-100/90 border border-stone-200/70 text-[#c85a32] font-medium">
                  自用工具落地
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Compressed Focus Summary (One Clean Row instead of massive resume cards) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {focusPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="p-5 rounded-xl bg-white/60 border border-stone-200/80 text-left flex flex-col justify-start hover:border-stone-300 transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2.5 text-stone-900 font-display font-bold text-sm sm:text-base mb-1.5">
                  <span className="p-1.5 rounded-lg bg-stone-100 text-[#c85a32]">
                    <Icon size={16} />
                  </span>
                  <span>{point.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
