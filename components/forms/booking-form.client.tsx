'use client';

import { useState, type FormEvent } from 'react';
import type { Course } from '@/lib/types';

export function BookingForm({ courses, selectedCourseId }: { courses: Course[]; selectedCourseId?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus('sending');
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setStatus(response.ok ? 'success' : 'error');
    if (response.ok) event.currentTarget.reset();
  }
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <label className="grid gap-1 text-sm font-semibold text-gray-700">Full Name<input name="name" required minLength={2} className="rounded-md border border-gray-300 px-3 py-2.5 font-normal" /></label>
      <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1 text-sm font-semibold text-gray-700">Email<input type="email" name="email" required className="rounded-md border border-gray-300 px-3 py-2.5 font-normal" /></label><label className="grid gap-1 text-sm font-semibold text-gray-700">Phone<input name="phone" required className="rounded-md border border-gray-300 px-3 py-2.5 font-normal" /></label></div>
      <label className="grid gap-1 text-sm font-semibold text-gray-700">Course<select name="course_id" defaultValue={selectedCourseId || ''} required className="rounded-md border border-gray-300 px-3 py-2.5 font-normal"><option value="" disabled>Select a course</option>{courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}</select></label>
      <label className="grid gap-1 text-sm font-semibold text-gray-700">Preferred Date<input type="date" name="preferred_date" className="rounded-md border border-gray-300 px-3 py-2.5 font-normal" /></label>
      <label className="grid gap-1 text-sm font-semibold text-gray-700">Message<textarea name="message" rows={4} className="rounded-md border border-gray-300 px-3 py-2.5 font-normal" placeholder="Tell us about your training needs." /></label>
      <button disabled={status === 'sending'} className="rounded-md bg-brand px-5 py-3 text-sm font-bold text-white hover:bg-brand-secondary disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Submit Booking Request'}</button>
      {status === 'success' ? <p role="status" className="text-sm font-semibold text-green-700">Thank you. Your booking request has been received.</p> : null}
      {status === 'error' ? <p role="alert" className="text-sm font-semibold text-red-700">Your request could not be submitted. Please check your details or contact us directly.</p> : null}
    </form>
  );
}
