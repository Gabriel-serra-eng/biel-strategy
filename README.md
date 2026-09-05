# Biel Strategy

Site pessoal de **Biel Strategy** — Estrategista de Aquisição & Soluções Digitais. Implementação em Next.js do design aprovado no Claude Design, com Marketing como eixo protagonista, Tecnologia como segundo eixo e Inteligência Artificial como camada complementar.

## Sobre o projeto

Este repositório carrega três camadas de decisão, nessa ordem:

1. **[`RESEARCH.md`](./RESEARCH.md)** — fonte de verdade do conteúdo: trajetória, competências de marketing, projetos/cases, stack e credenciais. Nenhum dado do site é inventado além do que está auditado aqui.
2. **[`IMPLEMENTATION.md`](./IMPLEMENTATION.md)** — contrato técnico: arquitetura, separação entre conteúdo/apresentação/experiência, critérios de performance, acessibilidade e SEO.
3. **`design_import/`** — bundle de handoff exportado do [Claude Design](https://claude.ai/design) com o protótipo visual aprovado (HTML/CSS/JS + design system em tokens). Mantido como referência histórica; não faz parte do app em produção.

A implementação real do site vive em `src/`, seguindo fielmente a composição, tipografia e hierarquia do design aprovado — sem redesenhar nada.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **CSS vanilla orientado a tokens** (cores, tipografia, espaçamento, motion) — fiel ao design system do handoff, sem Tailwind
- **GSAP + ScrollTrigger** para a camada de experiência: reveals de seção, rail de progresso da Jornada, crossfade de casos, CTA magnético e o glow cinematográfico da Hero — tudo com fallback completo em `prefers-reduced-motion`
- **next/font** (Montserrat + Inter, self-hosted) e **next/image** para performance e zero layout shift

## Estrutura

```
src/
  app/            → layout, metadata/SEO, globals.css (tokens + estilos das seções)
  data/site.ts     → conteúdo tipado, extraído do RESEARCH.md
  components/
    ui/            → primitivas do design system (Button, Quote, Callout, Section, Reveal...)
    sections/      → Hero, Jornada, Marketing, Casos, Tecnologia, IA, Stack, Formação, Visão, Fechamento
  hooks/           → useMagnetic (CTA magnético)
  lib/gsap.ts      → registro único do GSAP/ScrollTrigger + guarda de reduced-motion
  styles/tokens/   → cópia fiel dos tokens do design system (cores, tipografia, spacing, radius, elevation, motion)
public/images/     → assets reais (retrato extraído do handoff do Claude Design)
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de produção
npm run lint    # eslint
```

## Pendências conhecidas (`[VALIDAR]`)

O site sinaliza explicitamente, na própria interface, os dados ainda não confirmados pelo Research: sobrenome, WhatsApp comercial, e-mail, LinkedIn/GitHub, nome exato do curso em andamento, links de certificados auditáveis e a aprovação final do nome "Studio Unna Nail Spa" no case. Nenhum desses campos foi preenchido com suposição.
