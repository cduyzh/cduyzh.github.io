/**
 * Project Visual Cover Assets
 * Tailored vector illustrations for authentic project cards.
 * Designed with 16:10 aspect ratio, matching the warm studio aesthetic.
 */

export const projectCovers = {
  // 01. 月来信：经期记录与伴侣提醒
  lunaNote: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="bg-luna" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#faf7f2"/>
          <stop offset="100%" stop-color="#f0ebe1"/>
        </linearGradient>
        <linearGradient id="terracotta" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b5502a"/>
          <stop offset="100%" stop-color="#e07a5f"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg-luna)"/>
      <circle cx="400" cy="240" r="160" fill="none" stroke="#e5dfd5" stroke-width="1.5" stroke-dasharray="4 6"/>
      <circle cx="400" cy="240" r="120" fill="none" stroke="#ded8cd" stroke-width="1"/>
      
      <!-- Cycle Arc Highlight -->
      <path d="M 400 80 A 160 160 0 0 1 556 200" fill="none" stroke="url(#terracotta)" stroke-width="8" stroke-linecap="round"/>
      
      <!-- Moon Phase Crescent -->
      <path d="M 400 190 A 50 50 0 0 1 400 290 A 35 35 0 0 0 400 190" fill="#b5502a" opacity="0.85"/>
      <circle cx="400" cy="240" r="50" fill="none" stroke="#b5502a" stroke-width="1.5" opacity="0.3"/>

      <!-- Days Indicator Ring Points -->
      <circle cx="400" cy="80" r="5" fill="#b5502a"/>
      <circle cx="556" cy="200" r="4" fill="#b5502a"/>
      <circle cx="490" cy="350" r="3" fill="#a8a29e"/>
      <circle cx="310" cy="350" r="3" fill="#a8a29e"/>
      <circle cx="244" cy="200" r="3" fill="#a8a29e"/>

      <!-- Card UI Element: Companion Notification Preview -->
      <g transform="translate(180, 360)">
        <rect width="440" height="76" rx="16" fill="#ffffff" stroke="#e7e2d8" stroke-width="1.5"/>
        <circle cx="42" cy="38" r="18" fill="#fdf0ec"/>
        <path d="M 36 38 C 36 33 48 33 48 38 C 48 43 42 47 42 47 C 42 47 36 43 36 38 Z" fill="#b5502a" opacity="0.9"/>
        <text x="76" y="32" font-family="sans-serif" font-size="13" font-weight="600" fill="#292524">伴侣关怀提醒 · 预计 3 天后进入经期</text>
        <text x="76" y="52" font-family="sans-serif" font-size="11" fill="#78716c">“今天可以准备温水与暖宝宝，注意休息~”</text>
      </g>
      
      <!-- Top Badges -->
      <text x="50" y="60" font-family="monospace" font-size="12" font-weight="600" fill="#a8a29e" letter-spacing="2">LUNA NOTE // 01</text>
      <text x="50" y="80" font-family="sans-serif" font-size="14" font-weight="bold" fill="#44403c">月来信 · 经期生理规律与伴侣关怀</text>
    </svg>
  `)}`,

  // 02. 成都区级降雨／天气项目
  chengduWeather: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="bg-cd" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#edf2f7"/>
        </linearGradient>
        <linearGradient id="radar-sweep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg-cd)"/>

      <!-- Grid Coordinate Lines -->
      <g stroke="#e2e8f0" stroke-width="1">
        <line x1="80" y1="100" x2="720" y2="100"/>
        <line x1="80" y1="200" x2="720" y2="200"/>
        <line x1="80" y1="300" x2="720" y2="300"/>
        <line x1="80" y1="400" x2="720" y2="400"/>
        <line x1="200" y1="60" x2="200" y2="440"/>
        <line x1="360" y1="60" x2="360" y2="440"/>
        <line x1="520" y1="60" x2="520" y2="440"/>
        <line x1="680" y1="60" x2="680" y2="440"/>
      </g>

      <!-- Radar Rings -->
      <circle cx="440" cy="250" r="180" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="3 4"/>
      <circle cx="440" cy="250" r="120" fill="none" stroke="#94a3b8" stroke-width="1.5"/>
      <circle cx="440" cy="250" r="60" fill="none" stroke="#64748b" stroke-width="1"/>
      <circle cx="440" cy="250" r="3" fill="#0284c7"/>

      <!-- Radar Sweep Beam -->
      <path d="M 440 250 L 590 150 A 180 180 0 0 0 440 70 Z" fill="url(#radar-sweep)"/>

      <!-- Rain Clouds / Precipitation Reflectivity Clusters -->
      <ellipse cx="480" cy="210" rx="60" ry="38" fill="#38bdf8" opacity="0.35"/>
      <ellipse cx="495" cy="205" rx="35" ry="22" fill="#22c55e" opacity="0.45"/>
      <circle cx="505" cy="200" r="14" fill="#eab308" opacity="0.6"/>

      <!-- District Markers -->
      <g font-family="sans-serif" font-size="11" font-weight="600" fill="#475569">
        <circle cx="420" cy="235" r="3" fill="#0f172a"/>
        <text x="428" y="239">锦江区</text>
        <circle cx="390" cy="260" r="3" fill="#0f172a"/>
        <text x="340" y="264">武侯区</text>
        <circle cx="450" cy="290" r="3" fill="#0f172a"/>
        <text x="458" y="294">高新区</text>
        <circle cx="380" cy="210" r="3" fill="#0f172a"/>
        <text x="330" y="214">青羊区</text>
      </g>

      <!-- Sidebar Data Pill -->
      <g transform="translate(60, 290)">
        <rect width="220" height="130" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
        <text x="20" y="32" font-family="monospace" font-size="10" fill="#64748b">CHENGDU RADAR // 30.67°N</text>
        <text x="20" y="58" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">东部云团东移中</text>
        <text x="20" y="80" font-family="sans-serif" font-size="11" fill="#64748b">局地短时降水概率：68%</text>
        <rect x="20" y="96" width="180" height="6" rx="3" fill="#e2e8f0"/>
        <rect x="20" y="96" width="122" height="6" rx="3" fill="#0284c7"/>
      </g>

      <!-- Header Label -->
      <text x="50" y="60" font-family="monospace" font-size="12" font-weight="600" fill="#64748b" letter-spacing="2">DOPPLER GRID // 02</text>
      <text x="50" y="80" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">成都区级降雨 · 精细网格雷达</text>
    </svg>
  `)}`,

  // 03. 未来未发售游戏聚合与预测
  gameRadar: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="bg-game" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#faf9f5"/>
          <stop offset="100%" stop-color="#f1ede2"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg-game)"/>

      <!-- Timeline Horizon Line -->
      <line x1="80" y1="250" x2="720" y2="250" stroke="#d6d0c4" stroke-width="2"/>

      <!-- Quarter Indicators -->
      <g font-family="monospace" font-size="12" font-weight="700" fill="#8c8273">
        <text x="140" y="235">2026 Q2</text>
        <circle cx="170" cy="250" r="6" fill="#b5502a"/>
        
        <text x="320" y="235">2026 Q3</text>
        <circle cx="350" cy="250" r="6" fill="#44403c"/>

        <text x="500" y="235">2026 Q4</text>
        <circle cx="530" cy="250" r="6" fill="#8c8273"/>

        <text x="650" y="235">2027+</text>
        <circle cx="675" cy="250" r="6" fill="#d6d0c4"/>
      </g>

      <!-- Game Milestone Card 1 -->
      <g transform="translate(100, 100)">
        <rect width="180" height="90" rx="12" fill="#ffffff" stroke="#e0d9cc" stroke-width="1.5"/>
        <line x1="70" y1="90" x2="70" y2="144" stroke="#b5502a" stroke-width="1.5" stroke-dasharray="2 3"/>
        <text x="16" y="26" font-family="monospace" font-size="10" font-weight="bold" fill="#b5502a">MAY 2026 · TBD</text>
        <text x="16" y="48" font-family="sans-serif" font-size="13" font-weight="bold" fill="#292524">独立悬疑叙事新游</text>
        <rect x="16" y="60" width="46" height="18" rx="4" fill="#f5f0e6"/>
        <text x="24" y="73" font-family="monospace" font-size="9" fill="#57534e">Steam</text>
        <rect x="68" y="60" width="38" height="18" rx="4" fill="#f5f0e6"/>
        <text x="76" y="73" font-family="monospace" font-size="9" fill="#57534e">PS5</text>
      </g>

      <!-- Game Milestone Card 2 -->
      <g transform="translate(280, 280)">
        <rect width="200" height="100" rx="12" fill="#ffffff" stroke="#e0d9cc" stroke-width="1.5"/>
        <line x1="70" y1="0" x2="70" y2="-24" stroke="#44403c" stroke-width="1.5" stroke-dasharray="2 3"/>
        <text x="16" y="28" font-family="monospace" font-size="10" font-weight="bold" fill="#78716c">SEP 2026 · CONFIRMED</text>
        <text x="16" y="52" font-family="sans-serif" font-size="13" font-weight="bold" fill="#292524">箱庭动作冒险续作</text>
        <text x="16" y="72" font-family="sans-serif" font-size="11" fill="#78716c">发售日监控 · 期待指数 ★★★★★</text>
      </g>

      <!-- Game Milestone Card 3 -->
      <g transform="translate(500, 90)">
        <rect width="180" height="85" rx="12" fill="#ffffff" stroke="#e0d9cc" stroke-width="1.5"/>
        <line x1="30" y1="85" x2="30" y2="154" stroke="#8c8273" stroke-width="1.5" stroke-dasharray="2 3"/>
        <text x="16" y="26" font-family="monospace" font-size="10" font-weight="bold" fill="#8c8273">WINTER 2026</text>
        <text x="16" y="48" font-family="sans-serif" font-size="13" font-weight="bold" fill="#292524">开放世界科幻 RPG</text>
        <text x="16" y="68" font-family="sans-serif" font-size="11" fill="#78716c">延期概率预警：低</text>
      </g>

      <text x="50" y="60" font-family="monospace" font-size="12" font-weight="600" fill="#8c8273" letter-spacing="2">RELEASE RADAR // 03</text>
      <text x="50" y="80" font-family="sans-serif" font-size="14" font-weight="bold" fill="#292524">未来游戏聚合 · 发售日预测</text>
    </svg>
  `)}`,

  // 04. GPT Image 提示词工作库
  promptMatrix: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="bg-prompt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f7f6f2"/>
          <stop offset="100%" stop-color="#ede9e0"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg-prompt)"/>

      <!-- Matrix Syntax Tree Container -->
      <g transform="translate(80, 110)">
        <!-- Layer 1: Subject Token Block -->
        <rect x="0" y="0" width="280" height="74" rx="12" fill="#ffffff" stroke="#dcd5c7" stroke-width="1.5"/>
        <text x="18" y="24" font-family="monospace" font-size="10" font-weight="bold" fill="#b5502a">TOKEN_01 // 主体设定</text>
        <text x="18" y="50" font-family="monospace" font-size="13" fill="#292524">{ Subject: &quot;Architectural Interior&quot; }</text>

        <!-- Connecting Line -->
        <path d="M 280 37 L 340 37 L 340 85 L 370 85" fill="none" stroke="#b0a89a" stroke-width="1.5" stroke-dasharray="3 3"/>
        <path d="M 280 37 L 340 37 L 340 185 L 370 185" fill="none" stroke="#b0a89a" stroke-width="1.5" stroke-dasharray="3 3"/>

        <!-- Layer 2: Lighting Token Block -->
        <rect x="370" y="50" width="270" height="70" rx="12" fill="#ffffff" stroke="#dcd5c7" stroke-width="1.5"/>
        <text x="18" y="24" transform="translate(370, 50)" font-family="monospace" font-size="10" font-weight="bold" fill="#0284c7">TOKEN_02 // 光影方案</text>
        <text x="18" y="48" transform="translate(370, 50)" font-family="monospace" font-size="12" fill="#292524">[ Volumetric Fog, Warm Ray, 4500K ]</text>

        <!-- Layer 3: Render & Camera Token Block -->
        <rect x="370" y="150" width="270" height="70" rx="12" fill="#ffffff" stroke="#dcd5c7" stroke-width="1.5"/>
        <text x="18" y="24" transform="translate(370, 150)" font-family="monospace" font-size="10" font-weight="bold" fill="#16a34a">TOKEN_03 // 构图与画质</text>
        <text x="18" y="48" transform="translate(370, 150)" font-family="monospace" font-size="12" fill="#292524">--ar 16:10 --stylize 250 --v 6.1</text>
      </g>

      <!-- Bottom Formula Preview Bar -->
      <g transform="translate(80, 360)">
        <rect width="640" height="70" rx="14" fill="#ffffff" stroke="#dcd5c7" stroke-width="1.5"/>
        <circle cx="32" cy="35" r="10" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
        <text x="56" y="28" font-family="monospace" font-size="10" font-weight="bold" fill="#78716c">GENERATED PROMPT PAYLOAD</text>
        <text x="56" y="48" font-family="sans-serif" font-size="12" fill="#44403c">极简空间自然采光，混凝土材质微纹理，低饱和胶片颗粒调色配方已就绪</text>
      </g>

      <text x="50" y="60" font-family="monospace" font-size="12" font-weight="600" fill="#78716c" letter-spacing="2">PROMPT MATRIX // 04</text>
      <text x="50" y="80" font-family="sans-serif" font-size="14" font-weight="bold" fill="#292524">GPT Image 提示词工作库</text>
    </svg>
  `)}`,

  // 05. 星铁游戏信息查询／强敌资料整理
  starRailIntel: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="bg-hsr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f6f5f8"/>
          <stop offset="100%" stop-color="#eae7f0"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg-hsr)"/>

      <!-- Boss Specimen HUD Box -->
      <g transform="translate(70, 110)">
        <rect width="660" height="220" rx="16" fill="#ffffff" stroke="#d8d3e2" stroke-width="1.5"/>

        <!-- Boss Profile Mini Header -->
        <text x="28" y="38" font-family="monospace" font-size="11" font-weight="bold" fill="#7c3aed">BOSS TARGET // 混沌回忆 12 层首领</text>
        <text x="28" y="68" font-family="sans-serif" font-size="20" font-weight="extrabold" fill="#1e1b4b">诡弈砂金 / 强敌机制与抗性速查</text>

        <!-- Toughness Bar -->
        <text x="28" y="105" font-family="monospace" font-size="11" fill="#64748b">韧性条 (Toughness) : 540 Gauge</text>
        <rect x="28" y="115" width="400" height="10" rx="5" fill="#f1f5f9"/>
        <rect x="28" y="115" width="310" height="10" rx="5" fill="#f59e0b"/>

        <!-- Weakness Elements Pills -->
        <text x="28" y="155" font-family="sans-serif" font-size="12" font-weight="bold" fill="#334155">弱点属性 (Weakness)</text>
        <g transform="translate(28, 168)">
          <!-- Physical -->
          <rect x="0" y="0" width="68" height="28" rx="6" fill="#f1f5f9" stroke="#cbd5e1"/>
          <circle cx="14" cy="14" r="5" fill="#64748b"/>
          <text x="26" y="18" font-family="sans-serif" font-size="11" font-weight="bold" fill="#334155">物理</text>

          <!-- Lightning -->
          <rect x="76" y="0" width="68" height="28" rx="6" fill="#faf5ff" stroke="#e9d5ff"/>
          <circle cx="90" cy="14" r="5" fill="#a855f7"/>
          <text x="102" y="18" font-family="sans-serif" font-size="11" font-weight="bold" fill="#6b21a8">雷</text>

          <!-- Ice -->
          <rect x="152" y="0" width="68" height="28" rx="6" fill="#f0f9ff" stroke="#bae6fd"/>
          <circle cx="166" cy="14" r="5" fill="#0ea5e9"/>
          <text x="178" y="18" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0369a1">冰</text>
        </g>

        <!-- Right Side Stat Matrix -->
        <g transform="translate(460, 40)">
          <rect width="170" height="140" rx="12" fill="#faf8fc" stroke="#e5e0ed"/>
          <text x="16" y="26" font-family="monospace" font-size="10" fill="#7c3aed">RESISTANCE MATRIX</text>
          <text x="16" y="52" font-family="sans-serif" font-size="11" fill="#475569">虚数抗性: 40%</text>
          <text x="16" y="74" font-family="sans-serif" font-size="11" fill="#475569">风属性抗性: 20%</text>
          <text x="16" y="96" font-family="sans-serif" font-size="11" fill="#475569">控制抵抗: 100% (骰子)</text>
          <text x="16" y="118" font-family="sans-serif" font-size="11" font-weight="bold" fill="#15803d">推荐主 C: 黄泉 / 镜流</text>
        </g>
      </g>

      <!-- Bottom Quick Filter Chips -->
      <g transform="translate(70, 355)" font-family="sans-serif" font-size="11">
        <text x="0" y="20" fill="#6b7280">速查模式：</text>
        <rect x="65" y="4" width="90" height="26" rx="13" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="80" y="21" fill="#1e1b4b" font-weight="600">末日幻影</text>
        <rect x="165" y="4" width="90" height="26" rx="13" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="180" y="21" fill="#1e1b4b" font-weight="600">混沌回忆</text>
        <rect x="265" y="4" width="90" height="26" rx="13" fill="#ffffff" stroke="#cbd5e1"/>
        <text x="280" y="21" fill="#1e1b4b" font-weight="600">虚构叙事</text>
      </g>

      <text x="50" y="60" font-family="monospace" font-size="12" font-weight="600" fill="#7c3aed" letter-spacing="2">STAR RAIL INTEL // 05</text>
      <text x="50" y="80" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1e1b4b">星穹铁道强敌资料 · 弱点检索</text>
    </svg>
  `)}`,

  // 06. 个人图像生成与人物卡片工作流
  avatarWorkflow: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
      <defs>
        <linearGradient id="bg-avatar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fbf8f5"/>
          <stop offset="100%" stop-color="#f0ebe3"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg-avatar)"/>

      <!-- Character Card Canvas Frame -->
      <g transform="translate(180, 90)">
        <rect width="440" height="270" rx="16" fill="#ffffff" stroke="#e0d7c7" stroke-width="1.5"/>
        
        <!-- Left Side Portrait Mockup -->
        <rect x="20" y="20" width="160" height="230" rx="12" fill="#f5ede0"/>
        <circle cx="100" cy="95" r="45" fill="#e8dac5"/>
        <path d="M 60 190 C 60 145 140 145 140 190 Z" fill="#d9c7ad"/>
        <rect x="35" y="205" width="130" height="18" rx="9" fill="#ffffff" opacity="0.9"/>
        <text x="100" y="217" text-anchor="middle" font-family="monospace" font-size="9" fill="#78716c">ID: #0829_AVATAR</text>

        <!-- Right Side Parameter Badges -->
        <g transform="translate(200, 30)">
          <text x="0" y="16" font-family="sans-serif" font-size="16" font-weight="bold" fill="#292524">角色卡片标准渲染管线</text>
          <text x="0" y="38" font-family="sans-serif" font-size="11" fill="#78716c">前端排版引擎 + 提示词风格规范化</text>

          <!-- Attributes Table -->
          <g transform="translate(0, 56)" font-family="monospace" font-size="10">
            <rect x="0" y="0" width="210" height="26" rx="6" fill="#faf6ef"/>
            <text x="10" y="17" fill="#78716c">Palette: </text>
            <text x="65" y="17" font-weight="bold" fill="#b5502a">Warm Rice White / Terra</text>

            <rect x="0" y="32" width="210" height="26" rx="6" fill="#faf6ef"/>
            <text x="10" y="49" fill="#78716c">Consistency: </text>
            <text x="95" y="49" font-weight="bold" fill="#15803d">96.4% Seed Match</text>

            <rect x="0" y="64" width="210" height="26" rx="6" fill="#faf6ef"/>
            <text x="10" y="81" fill="#78716c">Export: </text>
            <text x="60" y="81" font-weight="bold" fill="#44403c">SVG / WebP / Canvas</text>
          </g>

          <!-- Workflow Arrow Tag -->
          <rect x="0" y="160" width="160" height="28" rx="14" fill="#b5502a" opacity="0.95"/>
          <text x="80" y="178" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="600" fill="#ffffff">生成统一规格卡片</text>
        </g>
      </g>

      <!-- Bottom Step Dots -->
      <g transform="translate(260, 395)" font-family="monospace" font-size="11" fill="#78716c">
        <text x="0" y="0">1. 特征拆解</text>
        <text x="100" y="0">→</text>
        <text x="130" y="0">2. 风格匹配</text>
        <text x="230" y="0">→</text>
        <text x="260" y="0">3. 画布排版</text>
      </g>

      <text x="50" y="60" font-family="monospace" font-size="12" font-weight="600" fill="#78716c" letter-spacing="2">AVATAR PIPELINE // 06</text>
      <text x="50" y="80" font-family="sans-serif" font-size="14" font-weight="bold" fill="#292524">个人图像生成与人物卡片工作流</text>
    </svg>
  `)}`
};
