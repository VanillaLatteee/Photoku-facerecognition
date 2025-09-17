import { useState } from 'react';
import { MobileShell } from '../components/MobileShell';
import { indexImage } from '../lib/api';
import { toast } from 'react-hot-toast';

export default function Admin() {
  const [eventId, setEventId] = useState(sessionStorage.getItem('eventId') ?? 'bdm-001');
  const [imageId, setImageId] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const submit = async () => {
    if (!file || !imageId) return toast.error('Lengkapi data');
    try {
      await indexImage({ eventId, imageId, file });
      toast.success('Indexed');
    } catch (e: any) {
      toast.error(e?.message ?? 'Gagal index');
    }
  };

  return (
    <MobileShell title="Admin Upload">
      <div className="card p-4 space-y-3">
        <input className="w-full rounded-xl border px-3 py-3"
          value={eventId} onChange={e=>setEventId(e.target.value)} placeholder="Event ID" />
        <input className="w-full rounded-xl border px-3 py-3"
          value={imageId} onChange={e=>setImageId(e.target.value)} placeholder="Image ID (unik)" />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <button onClick={submit} className="btn btn-primary w-full">Upload & Index</button>
      </div>
    </MobileShell>
  );
}