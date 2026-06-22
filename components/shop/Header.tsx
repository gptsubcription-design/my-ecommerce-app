import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900 tracking-wider">
          ShopLogo
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/products" className="text-gray-600 hover:text-black font-medium">Shop</Link>
          <Link href="/categories" className="text-gray-600 hover:text-black font-medium">Categories</Link>
          <Link href="/contact" className="text-gray-600 hover:text-black font-medium">Contact</Link>
        </nav>

        {/* Cart & Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="text-gray-600 hover:text-black font-medium">
            Cart (0)
          </Link>
          {/* এখানে পরে মোবাইলের জন্য হ্যামবার্গার মেনু বসবে */}
        </div>
      </div>
    </header>
  );
}