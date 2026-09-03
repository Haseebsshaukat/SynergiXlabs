'use client';

import { FormEvent, useState } from 'react';

interface BriefSummary { outcome: string; horizon: string; constraints: string }

export default function ContactForm() {
  const [summary, setSummary] = useState<BriefSummary | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSummary({
      outcome: String(form.get('outcome') ?? '').trim(),
      horizon: String(form.get('horizon') ?? '').trim(),
      constraints: String(form.get('constraints') ?? '').trim(),
    });
  };

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900 p-7">
      <form onSubmit={submit} className="space-y-5">
        <label className="block text-sm font-medium" htmlFor="outcome">Primary outcome
          <input id="outcome" name="outcome" required maxLength={160} className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3" placeholder="What should change for users or the business?" />
        </label>
        <label className="block text-sm font-medium" htmlFor="horizon">Delivery horizon
          <select id="horizon" name="horizon" required className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3">
            <option value="">Select a horizon</option><option>Under 6 weeks</option><option>6–12 weeks</option><option>3–6 months</option><option>Longer than 6 months</option>
          </select>
        </label>
        <label className="block text-sm font-medium" htmlFor="constraints">Known constraints
          <textarea id="constraints" name="constraints" required maxLength={500} rows={4} className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Budget, deadlines, dependencies, compliance, or migration limits" />
        </label>
        <button className="rounded-md bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300" type="submit">Create summary</button>
      </form>
      {summary && <section aria-live="polite" className="mt-6 rounded-lg bg-slate-950 p-5 text-sm">
        <h3 className="font-semibold text-cyan-300">Brief captured locally</h3>
        <dl className="mt-3 space-y-2 text-slate-300">
          <div><dt className="inline font-medium text-white">Outcome: </dt><dd className="inline">{summary.outcome}</dd></div>
          <div><dt className="inline font-medium text-white">Horizon: </dt><dd className="inline">{summary.horizon}</dd></div>
          <div><dt className="inline font-medium text-white">Constraints: </dt><dd className="inline">{summary.constraints}</dd></div>
        </dl>
      </section>}
    </div>
  );
}
