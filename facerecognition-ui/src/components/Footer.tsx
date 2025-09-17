export default function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto px-4 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} PhotoKu. All rights reserved.
      </div>
    </footer>
  );
}