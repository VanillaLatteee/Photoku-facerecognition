export default function SearchResult() {
    const photos = Array.from({ length: 6 }, (_, i) => `/dummy/photo${i + 1}.jpg`);
    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Cari..."
                className="w-full px-4 py-2 border rounded-full mb-4"
                defaultValue="#QrisRunBandung"
            />

            <div className="grid grid-cols-2 gap-4">
                {photos.map((url, i) => (
                    <img key={i} src={url} className="rounded-lg object-cover w-full h-40" />
                ))}
            </div>
        </div>
    );
}