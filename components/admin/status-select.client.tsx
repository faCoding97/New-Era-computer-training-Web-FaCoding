'use client';
import { useRef } from 'react';
export function StatusSelect({name='status',defaultValue,options}:{name?:string;defaultValue:string;options:string[]}){const ref=useRef<HTMLFormElement>(null);return <form ref={ref} action={undefined}><select name={name} defaultValue={defaultValue} className="rounded border border-gray-300 px-2 py-1" onChange={()=>ref.current?.requestSubmit()}>{options.map(option=><option key={option} value={option}>{option}</option>)}</select></form>}
