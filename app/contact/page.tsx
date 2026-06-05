import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '@/components/forms/contact-form.client';
import { Container } from '@/components/site/container';
import { PageHero } from '@/components/site/page-hero';
import { getSiteSettings } from '@/lib/content';
export const metadata:Metadata={title:'Contact',description:'Contact New Era Computer Training Centre in Port Elizabeth (Gqeberha).'};
export default async function ContactPage(){const settings=await getSiteSettings();return <main><PageHero eyebrow="Contact New Era" title="Discuss your training goals with our team" text="Contact us about individual courses, group training, corporate programmes or general enquiries."/><section className="py-16"><Container className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div className="space-y-4">{[[MapPin,settings.address],[Phone,settings.phone],[Mail,settings.email]].map(([Icon,text])=>{const I=Icon as typeof Mail;return <div key={text as string} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5"><I className="h-6 w-6 shrink-0 text-accent"/><p className="text-sm leading-6 text-gray-700">{text as string}</p></div>})}</div><ContactForm/></Container></section></main>}
