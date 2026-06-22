import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">ShopLogo</h3>
          <p className="text-gray-400 text-sm">
            Top quality products delivered right to your doorstep.
          </p>
        </div>

        {/* Helpful Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Support</h3>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400 text-sm mb-1">Email: support@shop.com</p>
          <p className="text-gray-400 text-sm">Phone: +880 123 456 7890</p>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ShopLogo. All rights reserved.
      </div>
    </footer>
  );
}