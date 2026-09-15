import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { contactData, socialsData } from '../data/socials';
import { Mail, Check, Copy, ArrowUpRight, Github, MessageSquare, MapPin, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    setCopyError(null);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedItem(label);
        setTimeout(() => setCopiedItem(null), 2500);
      } else {
        // Fallback for non-secure contexts or older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (success) {
          setCopiedItem(label);
          setTimeout(() => setCopiedItem(null), 2500);
        } else {
          throw new Error('复制命令未获支持');
        }
      }
    } catch {
      setCopyError(`复制失败，请手动选择文本复制：${text}`);
      setTimeout(() => setCopyError(null), 4000);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Github': return <Github size={18} />;
      case 'MessageSquare': return <MessageSquare size={18} />;
      case 'Mail': return <Mail size={18} />;
      default: return <ArrowUpRight size={18} />;
    }
  };

  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 md:py-32 bg-[#ece9e2] text-stone-900 border-t border-stone-300/80">
      {/* Toast Notification with aria-live="polite" */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {copiedItem && `已复制 ${copiedItem} 到剪贴板`}
        {copyError && copyError}
      </div>

      <AnimatePresence>
        {copiedItem && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 z-50 px-5 py-3 rounded-full bg-stone-900 text-stone-100 font-mono text-xs font-medium shadow-xl flex items-center gap-2.5 border border-stone-700"
          >
            <Check size={16} className="text-emerald-400" />
            <span>已复制 {copiedItem} 到剪贴板</span>
          </motion.div>
        )}

        {copyError && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 z-50 px-5 py-3 rounded-full bg-red-900 text-red-100 font-mono text-xs font-medium shadow-xl flex items-center gap-2.5 border border-red-700"
          >
            <AlertCircle size={16} className="text-red-300" />
            <span>{copyError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-12">
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#c85a32] font-semibold mb-6">
          <span>03 / 联系方式</span>
          <span>·</span>
          <span>保持交流</span>
        </div>

        {/* Big Statement Headline */}
        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight"
          >
            {contactData.headline}
          </motion.h2>

          <p className="mt-4 text-base sm:text-lg text-stone-700 font-normal leading-relaxed">
            {contactData.subheadline}
          </p>
        </div>

        {/* Direct Email Hero Pill */}
        <div className="mt-8 sm:mt-10">
          <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 p-2 pr-4 rounded-2xl sm:rounded-full bg-white border border-stone-300/80 shadow-xs">
            <a
              href={`mailto:${contactData.email}`}
              className="px-5 py-2.5 rounded-full bg-stone-900 text-stone-100 font-medium text-xs font-mono hover:bg-[#c85a32] transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
            >
              <Mail size={14} />
              <span>发送邮件</span>
            </a>

            <button
              type="button"
              onClick={() => handleCopy(contactData.email, '邮箱地址')}
              className="text-xs sm:text-sm font-mono text-stone-700 hover:text-stone-950 flex items-center gap-2 transition-colors py-1.5 px-3 rounded-full hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
              title="点击复制邮箱地址"
            >
              <span>{contactData.email}</span>
              {copiedItem === '邮箱地址' ? (
                <Check size={14} className="text-emerald-600" />
              ) : (
                <Copy size={14} className="text-stone-400" />
              )}
            </button>
          </div>
        </div>

        {/* Verified Channels Grid (GitHub, Email, WeChat) */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-stone-300/80">
          <div className="text-xs font-mono text-stone-500 tracking-wider mb-5">
            已确认的个人主页与触点
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialsData.map((social) => {
              const isCopy = social.isCopyable;

              if (isCopy && social.copyValue) {
                return (
                  <button
                    key={social.name}
                    type="button"
                    onClick={() => handleCopy(social.copyValue!, `${social.name} (${social.copyValue})`)}
                    className="p-4 sm:p-5 rounded-2xl bg-white/85 hover:bg-white border border-stone-200 hover:border-stone-400 shadow-xs hover:shadow-md transition-[border-color,box-shadow,background-color] duration-200 text-left flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-stone-100 text-stone-700 group-hover:text-[#c85a32] group-hover:bg-[#c85a32]/10 transition-colors">
                        {getIcon(social.icon || '')}
                      </div>
                      <div>
                        <div className="font-display font-bold text-stone-900 text-sm sm:text-base">
                          {social.name}
                        </div>
                        <div className="text-xs font-mono text-stone-500 mt-0.5">
                          {social.handle}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-stone-400 group-hover:text-stone-900 transition-colors flex items-center gap-1">
                      <span>复制</span>
                      <Copy size={12} />
                    </div>
                  </button>
                );
              }

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 sm:p-5 rounded-2xl bg-white/85 hover:bg-white border border-stone-200 hover:border-stone-400 shadow-xs hover:shadow-md transition-[border-color,box-shadow,background-color] duration-200 flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c85a32]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-stone-100 text-stone-700 group-hover:text-[#c85a32] group-hover:bg-[#c85a32]/10 transition-colors">
                      {getIcon(social.icon || '')}
                    </div>
                    <div>
                      <div className="font-display font-bold text-stone-900 text-sm sm:text-base">
                        {social.name}
                      </div>
                      <div className="text-xs font-mono text-stone-500 mt-0.5">
                        {social.handle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={15} className="text-stone-400 group-hover:text-[#c85a32] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Status Meta Box */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white/90 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-stone-600">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <div>
              <span className="font-semibold text-stone-900">当前状态：</span>
              <span>{contactData.availability}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-stone-500">
            <MapPin size={13} className="text-stone-400" />
            <span>中国 · 成都</span>
          </div>
        </div>
      </div>
    </section>
  );
}
