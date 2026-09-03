'use client';

import { motion } from 'framer-motion';
import ContactForm from './components/ContactForm';

const services = [
  { title: 'Product discovery', description: 'Turn uncertain ideas into validated outcomes, delivery constraints, and an executable roadmap.' },
  { title: 'Application delivery', description: 'Build accessible web products with observable services and maintainable release workflows.' },
  { title: 'Platform modernization', description: 'Plan migrations around business continuity, measurable risk reduction, and controlled cutovers.' },
  { title: 'Delivery assurance', description: 'Track scope, capacity, quality, and operational readiness from kickoff through handover.' },
];

const outcomes = [
  { metric: 'Scope clarity', detail: 'Traceable goals, assumptions, dependencies, and acceptance signals.' },
  { metric: 'Predictable delivery', detail: 'Capacity-aware plans with explicit risk and contingency decisions.' },
  { metric: 'Operational confidence', detail: 'Security, accessibility, release, and handover checks built into delivery.' },
];

const stages = [
  ['01', 'Discover', 'Frame the problem, users, evidence, constraints, and expected outcomes.'],
  ['02', 'Plan', 'Estimate work, sequence dependencies, allocate capacity, and expose delivery risks.'],
  ['03', 'Deliver', 'Ship in reviewable increments with automated quality and readiness evidence.'],
  ['04', 'Handover', 'Transfer knowledge, operating controls, documentation, and ownership cleanly.'],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <nav aria-label="Primary navigation" className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#home" className="font-semibold tracking-tight">Delivery Compass</a>
          <div className="flex items-center gap-5 text-sm text-slate-300">
            <a className="hover:text-white" href="#services">Capabilities</a>
            <a className="hover:text-white" href="#process">Process</a>
            <a className="rounded-md bg-cyan-400 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-300" href="#brief">Plan a project</a>
          </div>
        </div>
      </nav>

      <section id="home" className="relative overflow-hidden px-6 py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,.18),transparent_45%)]" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative mx-auto max-w-6xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[.24em] text-cyan-300">Digital delivery planning</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">Move complex product work from uncertainty to an executable plan.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">A practical toolkit for scoping, estimating, governing, and handing over modern digital products without hiding the difficult delivery decisions.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#brief" className="rounded-md bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300">Create a project brief</a>
            <a href="#process" className="rounded-md border border-slate-600 px-6 py-3 font-semibold hover:border-slate-300">Review the process</a>
          </div>
        </motion.div>
      </section>

      <section id="services" className="border-y border-white/10 bg-slate-900/60 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan-300">Capabilities</p>
          <h2 className="mt-3 text-3xl font-semibold">Delivery controls that stay useful after kickoff</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="rounded-xl border border-white/10 bg-slate-950/60 p-7">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {outcomes.map((outcome) => (
            <article key={outcome.metric} className="border-l-2 border-cyan-400 pl-5">
              <h2 className="text-xl font-semibold">{outcome.metric}</h2>
              <p className="mt-2 leading-7 text-slate-400">{outcome.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="bg-white px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan-700">Working model</p>
          <h2 className="mt-3 text-3xl font-semibold">A visible path from discovery to ownership</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {stages.map(([number, title, description]) => (
              <article key={number}>
                <p className="text-sm font-bold text-cyan-700">{number}</p>
                <h3 className="mt-2 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="brief" className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan-300">Project brief</p>
            <h2 className="mt-3 text-3xl font-semibold">Start with the decisions that shape delivery.</h2>
            <p className="mt-5 leading-7 text-slate-400">Capture a concise brief locally in your browser. Nothing is transmitted to an external service.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-sm text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3">
          <span>Delivery Compass</span>
          <span>Identity-neutral demonstration project</span>
        </div>
      </footer>
    </main>
  );
}
