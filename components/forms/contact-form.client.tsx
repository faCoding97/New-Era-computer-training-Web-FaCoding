'use client';

import { useState, type FormEvent } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus('sending');
    const response = await fetch('/api/enquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget).entries())) });
    setStatus(response.ok ? 'success' : 'error'); if (response.ok) event.currentTarget.reset();
  }
  return <form onSubmit={submit} className="grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <label className="grid gap-1 text-sm font-semibold text-gray-700">Name<input name="name" required className="rounded-md border border-gray-300 px-3 py-2.5 font-normal" /></label>
    <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1 text-sm font-semibold text-gray-700">Email<input name="email" type="email" required className="rounded-md border border-gray-300 px-3 py-2.5 font-normal" /></label><label className="grid gap-1 text-sm font-semibold text-gray-700">Phone<input name="phone" className="rounded-md border border-gray-300 px-3 py-2.5 font-normal" /></label></div>
    <label className="grid gap-1 text-sm font-semibold text-gray-700">Subject<input name="subject" required className="rounded-md border border-gray-300 px-3 py-2.5 font-normal" /></label>
    <label className="grid gap-1 text-sm font-semibold text-gray-700">Message<textarea name="message" rows={6} required className="rounded-md border border-gray-300 px-3 py-2.5 font-normal" /></label>
    <button disabled={status === 'sending'} className="rounded-md bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-secondary disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send Enquiry'}</button>
    {status === 'success' ? <p role="status" className="text-sm font-semibold text-green-700">Thank you. Your enquiry has been received.</p> : null}
    {status === 'error' ? <p role="alert" className="text-sm font-semibold text-red-700">Your message could not be sent. Please try again or contact us directly.</p> : null}
  </form>;
}
