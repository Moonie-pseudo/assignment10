export default function Footer() {
  return (
    <footer className="bg-base-200 mt-10 p-6 text-center">

      <h2 className="text-xl font-bold">🐾 PawMart</h2>
      <p className="max-w-[500px] mx-auto text-sm mt-2">
        PawMart connects local pet owners and buyers for adoption and pet care products.
      </p>

      <div className="mt-4 flex justify-center gap-5 text-sm">
        <a href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/terms">Terms</a>
      </div>

      <p className="mt-4 text-xs text-gray-500">
        © {new Date().getFullYear()} PawMart. All rights reserved.
      </p>

    </footer>
  );
}
