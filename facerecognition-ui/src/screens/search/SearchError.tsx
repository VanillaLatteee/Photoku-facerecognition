export default function SearchError() {
    return (
        <div className="p-4 text-center space-y-4">
            <input type="text" className="w-full px-4 py-2 border rounded-full mb-6" placeholder="Cari..." />
            <img src="/error.svg" alt="Error" className="mx-auto w-32 h-32" />
            <p className="text-red-600">Terjadi kesalahan. Coba lagi nanti.</p>
        </div>
    );
}