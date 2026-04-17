import Image from "next/image";
import Link from "next/link";

function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mb-4 text-[1.75rem] font-semibold tracking-tight text-ink ${className}`}
    >
      {children}
    </h2>
  );
}

export function HomeContent() {
  return (
    <main id="main">
      <section
        id="top"
        className="bg-gradient-to-b from-white to-surface px-6 pb-16 pt-14"
      >
        <div className="mx-auto grid max-w-content items-center gap-12 lg:grid-cols-[1fr_minmax(280px,46%)]">
          <div>
            <h1 className="mb-5 text-[clamp(2.1rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-tight text-ink">
              专为可靠交付而制造
            </h1>
            <p className="mb-6 max-w-xl text-xl leading-snug text-ink-muted">
              我们是金属与橡胶零部件领域注重质量与可追溯性的制造伙伴。
            </p>
            <p className="mb-8 max-w-2xl text-[0.95rem] leading-relaxed text-ink-muted">
              宁国人峰机械零部件有限公司专注金属及橡胶零部件，员工 80
              余人，配备专业技术与质量工程团队，质量体系完备，物流便捷。以专业高效为准则，致力于成为客户长期发展的合作伙伴。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded px-6 py-3.5 text-[0.8rem] font-semibold text-white no-underline transition hover:bg-teal-dark bg-teal"
              >
                联系我们
              </a>
              <a
                href="https://www.renfengsp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded border border-line px-6 py-3.5 text-[0.8rem] font-semibold text-ink no-underline transition hover:border-teal hover:text-teal-dark"
              >
                访问官网
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-line shadow-xl">
            <Image
              src="/assets/hero/company-about.png"
              alt="公司与制造实景"
              width={800}
              height={600}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="bg-gradient-to-br from-teal-dark to-[#004a52] px-6 py-10 text-white"
      >
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="mb-3 text-[1.35rem] font-semibold">
              新厂区 · 新体系 · 持续验证能力
            </h2>
            <p className="max-w-2xl text-[0.95rem] leading-relaxed opacity-90">
              新厂房建筑面积约 27 045 ㎡，占地约 60 亩，固定资产约 1.2
              亿人民币；已取得 IATF16949
              质量体系证书，并配备进口检测与实验室资源。2024
              年起计划进一步引进先进检测仪器，强化过程与产品验证。
            </p>
          </div>
          <a
            href="#quality"
            className="inline-flex shrink-0 items-center justify-center rounded bg-white px-6 py-3 text-[0.8rem] font-semibold text-teal-dark no-underline transition hover:bg-surface"
          >
            了解质量体系
          </a>
        </div>
      </section>

      <section id="pillars" className="mx-auto max-w-content px-6 py-16">
        <div className="mx-auto mb-11 max-w-xl text-center">
          <h2 className="mb-3 text-[clamp(1.65rem,3vw,2rem)] font-semibold tracking-tight text-ink">
            以工艺与数据支撑您的零部件战略
          </h2>
          <p className="text-ink-muted">
            从橡胶硫化到精密机加工，从过程检验到出厂放行，我们用可追溯的流程对接汽车、机械与家电等行业的严格要求。
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "橡胶与硫化",
              d: "橡胶硫化产线与成熟工艺控制，满足密封、减震等橡胶件批量一致性。",
              a: "#equipment",
              l: "了解设备",
            },
            {
              t: "精密机加工",
              d: "数控车床与加工中心等能力，承接复杂金属结构件与中小批量到量产爬坡。",
              a: "#equipment",
              l: "了解设备",
            },
            {
              t: "检测与实验室",
              d: "三坐标、光谱、拉力与粗糙度等检测手段，支撑来料、过程与出厂多道关口。",
              a: "#quality",
              l: "查看证书",
            },
            {
              t: "出口与协作",
              d: "英文技术沟通、文档与包装规范可配合外贸场景，便于 OEM 与长期框架协议。",
              a: "#contact",
              l: "获取报价",
            },
          ].map((c) => (
            <article
              key={c.t}
              className="flex h-full flex-col rounded-lg border border-line bg-white p-6 transition hover:border-teal/35 hover:shadow-lg"
            >
              <h3 className="mb-2.5 text-[1.05rem] font-semibold text-ink">
                {c.t}
              </h3>
              <p className="mb-4 flex-1 text-[0.88rem] leading-relaxed text-ink-muted">
                {c.d}
              </p>
              <a
                href={c.a}
                className="inline-flex items-center gap-1 text-[0.78rem] font-semibold text-teal-dark no-underline after:transition-transform after:content-['→'] hover:after:translate-x-1"
              >
                {c.l}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="solutions" className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-content">
          <div className="mx-auto mb-11 max-w-xl text-center">
            <h2 className="mb-3 text-[clamp(1.65rem,3vw,2rem)] font-semibold tracking-tight text-ink">
              了解我们的制造组合
            </h2>
            <p className="text-ink-muted">
              金属与橡胶双线能力，覆盖从材料到总成的一站式协作入口。
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-white">
              <div className="relative h-[200px] border-b border-line bg-teal-soft">
                <Image
                  src="/assets/categories/img-31.jpeg"
                  alt="金属零部件"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="mb-2.5 text-xl font-semibold text-ink">
                  金属零部件解决方案
                </h3>
                <p className="mb-5 text-[0.92rem] leading-relaxed text-ink-muted">
                  机械加工、冷挤压、热锻、压铸、电泳等工艺；铝、钢等多材质路线，服务汽车、工程机械与通用机械客户。
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <a
                    href="#products"
                    className="rounded bg-teal-soft px-3.5 py-2 text-[0.78rem] font-semibold text-teal-dark no-underline hover:bg-teal/20"
                  >
                    工艺一览
                  </a>
                  <a
                    href="#factory"
                    className="rounded bg-teal-soft px-3.5 py-2 text-[0.78rem] font-semibold text-teal-dark no-underline hover:bg-teal/20"
                  >
                    产能实景
                  </a>
                </div>
              </div>
            </article>
            <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-white">
              <div className="relative h-[200px] border-b border-line bg-teal-soft">
                <Image
                  src="/assets/categories/img-29.jpeg"
                  alt="橡胶与总成"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="mb-2.5 text-xl font-semibold text-ink">
                  橡胶与总成解决方案
                </h3>
                <p className="mb-5 text-[0.92rem] leading-relaxed text-ink-muted">
                  橡胶件硫化与金属件组合装配（ASSY），适配家电五金、车辆周边与多行业密封减震需求。
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <a
                    href="#products"
                    className="rounded bg-teal-soft px-3.5 py-2 text-[0.78rem] font-semibold text-teal-dark no-underline hover:bg-teal/20"
                  >
                    产品类型
                  </a>
                  <a
                    href="#customers"
                    className="rounded bg-teal-soft px-3.5 py-2 text-[0.78rem] font-semibold text-teal-dark no-underline hover:bg-teal/20"
                  >
                    配套案例
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-content px-6">
        <div
          className="my-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4"
          aria-label="企业关键数据"
        >
          {[
            ["80+", "员工"],
            ["500万", "注册资本（人民币）"],
            ["27045㎡", "新厂房建筑面积"],
            ["IATF16949", "质量体系"],
          ].map(([n, l]) => (
            <div key={l} className="bg-white px-4 py-6 text-center">
              <strong className="mb-1 block text-[1.65rem] font-bold text-teal-dark">
                {n}
              </strong>
              <span className="text-[0.72rem] uppercase tracking-wide text-ink-muted">
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>

      <section id="about" className="mx-auto max-w-content px-6 pb-16">
        <SectionTitle>公司概况</SectionTitle>
        <div className="prose-block max-w-3xl text-ink-muted">
          <p>
            公司秉持专业高效的精神，以质量求生存，以科技谋发展，创一流品牌，竭诚为顾客提供高品质的产品和高品位的专业服务。
          </p>
        </div>
        <div id="history" className="mt-8 grid gap-4">
          {[
            ["2013", "成立人峰机械零部件有限公司，注册资金 500 万人民币。"],
            ["2015", "引进加工中心，扩展机加工能力。"],
            ["2017", "增加新的生产工艺，加强产品质量控制，更好满足客户需求。"],
            ["2019", "新厂房投产；取得 IATF16949；引进进口检测设备。"],
            ["2024", "计划引进先进检测仪器，持续提升实验室能力。"],
          ].map(([y, t]) => (
            <article
              key={y}
              className="rounded-r-lg border-l-4 border-teal bg-surface px-6 py-5"
            >
              <div className="mb-1.5 text-[0.85rem] font-bold text-teal-dark">
                {y}
              </div>
              <p className="m-0 text-[0.9rem] text-ink-muted">{t}</p>
            </article>
          ))}
        </div>
        <figure className="mt-8 overflow-hidden rounded-lg border border-line bg-surface p-4">
          <Image
            src="/assets/hero/sales-chart.png"
            alt="年销售额趋势"
            width={1200}
            height={600}
            className="h-auto w-full"
          />
          <figcaption className="pt-3 text-[0.85rem] text-ink-muted">
            年销售额持续稳定增长（企业介绍素材）
          </figcaption>
        </figure>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-content px-6">
          <h2 className="mb-6 text-[1.75rem] font-semibold text-ink">
            企业文化
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["创新发展", "将创新置于制造全局核心，持续提升供给质量与效益。", "#pillars"],
              ["不断改进", "致力于生产更好的产品，并持续改进产品与过程。", "#factory"],
              ["服务客户", "保证服务品质，满足客户需求，做可信赖的供应链伙伴。", "#contact"],
              ["长期合作", "以专业与透明赢得客户长期发展中的稳定配套地位。", "#customers"],
            ].map(([t, d, h]) => (
              <article
                key={t}
                className="flex h-full flex-col rounded-lg border border-line bg-white p-6"
              >
                <h3 className="mb-2.5 text-[1.05rem] font-semibold">{t}</h3>
                <p className="mb-4 flex-1 text-[0.88rem] text-ink-muted">{d}</p>
                <a
                  href={h}
                  className="text-[0.78rem] font-semibold text-teal-dark no-underline"
                >
                  了解更多 →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="factory" className="mx-auto max-w-content px-6 py-16">
        <SectionTitle className="mb-2">公司实景</SectionTitle>
        <p className="mb-6 max-w-3xl text-ink-muted">
          生产、仓储与厂区的现场记录，便于客户远程验厂与风险评估。
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["slide11-11.jpeg", "厂区 / 车间"],
            ["slide11-12.jpeg", "生产现场"],
            ["slide11-13.jpeg", "制造单元"],
            ["slide11-14.jpeg", "仓储与物流"],
            ["slide11-15.jpeg", "工厂外景"],
            ["slide11-16.jpeg", "综合场景"],
          ].map(([f, cap]) => (
            <figure
              key={f}
              className="m-0 overflow-hidden rounded-lg border border-line bg-white"
            >
              <div className="relative h-[190px]">
                <Image
                  src={`/assets/factory/${f}`}
                  alt={cap}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <figcaption className="px-3 py-2.5 text-[0.72rem] text-ink-muted">
                {cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="equipment" className="mx-auto max-w-content px-6 pb-16">
        <SectionTitle>主要生产与检测设备</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["/assets/equipment/img-17.jpeg", "橡胶硫化机"],
            ["/assets/equipment/img-18.jpeg", "数控车床"],
            ["/assets/equipment/img-19.jpeg", "加工中心"],
            ["/assets/equipment/img-20.jpeg", "锻压设备"],
            ["/assets/testing/img-21.jpeg", "拉力试验机"],
            ["/assets/testing/img-22.jpeg", "三坐标 CMM"],
            ["/assets/testing/img-23.jpeg", "自动检测仪"],
            ["/assets/testing/img-24.jpeg", "光谱仪"],
            ["/assets/testing/img-25.jpeg", "粗糙度仪"],
          ].map(([src, cap]) => (
            <figure
              key={src}
              className="m-0 overflow-hidden rounded-lg border border-line bg-white"
            >
              <div className="relative h-[190px]">
                <Image
                  src={src}
                  alt={cap}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <figcaption className="px-3 py-2.5 text-[0.72rem] text-ink-muted">
                {cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="quality" className="mx-auto max-w-content px-6 pb-16">
        <SectionTitle>质量体系证书</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["/assets/certs/cert-26.png", "证书 1"],
            ["/assets/certs/image27.jpeg", "证书 2"],
            ["/assets/certs/image28.jpeg", "证书 3"],
          ].map(([src, alt]) => (
            <figure
              key={src}
              className="m-0 rounded-lg border border-line bg-white p-2"
            >
              <Image
                src={src}
                alt={alt}
                width={400}
                height={300}
                className="h-auto w-full"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white px-6 py-12 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-ink">
          有图纸或样品，不确定从哪条工艺切入？
        </h2>
        <p className="mx-auto mb-6 max-w-lg text-ink-muted">
          将需求发给我们的技术与报价团队，可协助梳理工艺路线、公差与检测方案。
        </p>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded bg-teal px-6 py-3.5 text-[0.8rem] font-semibold text-white no-underline transition hover:bg-teal-dark"
        >
          开始沟通
        </a>
      </section>

      <section id="products" className="mx-auto max-w-content px-6 py-16">
        <SectionTitle className="mb-2">产品与工艺</SectionTitle>
        <p className="mb-6 text-ink-muted">
          主要工艺：机械加工，冷挤压，热锻，压铸，硫化，电泳。
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/assets/categories/img-29.jpeg", "Rubber 橡胶"],
            ["/assets/categories/img-30.jpeg", "Metal — Aluminum"],
            ["/assets/categories/img-31.jpeg", "Metal — Steel"],
            ["/assets/categories/img-32.jpeg", "ASSY 总成"],
          ].map(([src, cap]) => (
            <figure
              key={src}
              className="m-0 overflow-hidden rounded-lg border border-line bg-white"
            >
              <div className="relative h-[190px]">
                <Image
                  src={src}
                  alt={cap}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <figcaption className="px-3 py-2.5 text-[0.72rem] text-ink-muted">
                {cap}
              </figcaption>
            </figure>
          ))}
        </div>
        <h3 className="mb-4 mt-10 text-lg font-semibold text-ink">
          主要应用行业
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/assets/industries/img-33.jpeg", "汽车"],
            ["/assets/industries/img-34.jpeg", "机械设备"],
            ["/assets/industries/img-35.jpeg", "家电五金"],
            ["/assets/industries/img-36.jpeg", "摩托车 / 自行车"],
          ].map(([src, cap]) => (
            <figure
              key={src}
              className="m-0 overflow-hidden rounded-lg border border-line bg-white"
            >
              <div className="relative h-[190px]">
                <Image
                  src={src}
                  alt={cap}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <figcaption className="px-3 py-2.5 text-[0.72rem] text-ink-muted">
                {cap}
              </figcaption>
            </figure>
          ))}
        </div>
        <h3 className="mb-4 mt-10 text-lg font-semibold text-ink">
          产品展示（节选）
        </h3>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2">
          {Array.from({ length: 12 }, (_, i) => (
            <Link
              key={i}
              href={`/assets/products/p-${i + 1}.png`}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square overflow-hidden rounded-md border border-line"
            >
              <Image
                src={`/assets/products/p-${i + 1}.png`}
                alt=""
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
      </section>

      <section id="customers" className="mx-auto max-w-content px-6 pb-16">
        <SectionTitle className="mb-2">配套客户（节选）</SectionTitle>
        <p className="mb-6 text-ink-muted">以下为部分配套客户标识。</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
          {Array.from({ length: 10 }, (_, i) => (
            <Image
              key={i}
              src={`/assets/customers/cust-${i + 1}.jpeg`}
              alt={`客户 ${i + 1}`}
              width={140}
              height={44}
              className="h-10 w-auto max-w-[120px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-content px-6 pb-20">
        <SectionTitle className="mb-6">联系我们</SectionTitle>
        <div className="grid gap-10 md:grid-cols-2">
          <dl className="m-0 space-y-4 text-[0.95rem] text-ink-muted">
            <div>
              <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                联系人
              </dt>
              <dd className="m-0">张先生 · MR Zhang</dd>
            </div>
            <div>
              <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                电话
              </dt>
              <dd className="m-0">
                <a
                  href="tel:+865634186052"
                  className="font-medium text-ink underline decoration-teal underline-offset-2"
                >
                  0563-4186052
                </a>
              </dd>
            </div>
            <div>
              <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                手机
              </dt>
              <dd className="m-0">
                <a
                  href="tel:+8618956386218"
                  className="font-medium text-ink underline decoration-teal underline-offset-2"
                >
                  189 5638 6218
                </a>
              </dd>
            </div>
            <div>
              <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                邮箱
              </dt>
              <dd className="m-0">
                <a
                  href="mailto:1290156664@qq.com"
                  className="font-medium text-ink underline decoration-teal underline-offset-2"
                >
                  1290156664@qq.com
                </a>
              </dd>
            </div>
          </dl>
          <dl className="m-0 space-y-4 text-[0.95rem] text-ink-muted">
            <div>
              <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                地址
              </dt>
              <dd className="m-0">
                安徽省宁国市兴宁路 116 号
                <br />
                No.116, Xingning Road, Ningguo City, Anhui Province, China
              </dd>
            </div>
            <div>
              <dt className="mb-1 text-[0.7rem] font-semibold uppercase tracking-wide text-teal-dark">
                网站
              </dt>
              <dd className="m-0">
                <a
                  href="https://www.renfengsp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-teal underline-offset-2"
                >
                  www.renfengsp.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="bg-ink px-6 py-10 text-[0.8rem] text-white/70">
        <div className="mx-auto flex max-w-content flex-wrap items-start justify-between gap-6">
          <div>
            <p className="m-0 text-white/90">© 宁国人峰机械零部件有限公司</p>
            <p className="mt-3 max-w-lg text-[0.72rem] leading-relaxed opacity-75">
              版式与信息架构灵感参考{" "}
              <a
                href="https://www.eos.info/zh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 underline"
              >
                EOS 中文官网
              </a>
              （工业 B2B：大标题、青绿主色、四卡亮点、双解决方案入口与中置
              CTA），并非 EOS 关联或授权页面；企业文案与图片均来自宁国人峰自有资料。
            </p>
            <p className="mt-2 text-[0.72rem] opacity-75">
              静态 HTML 演示位于同仓库目录{" "}
              <code className="rounded bg-white/10 px-1">ningguo-renfeng-site/</code>
            </p>
          </div>
          <div>
            <a
              href="https://www.renfengsp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 underline"
            >
              renfengsp.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
