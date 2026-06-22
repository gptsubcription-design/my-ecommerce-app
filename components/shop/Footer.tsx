import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#121621] text-[#a0a4ab] font-sans pt-16 pb-6">
      <div className="container mx-auto px-4">
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: About & Socials */}
          <div>
            <Link href="/" className="text-3xl font-bold tracking-wide text-white inline-block mb-6">
              Stash House<span className="text-sm align-top">&reg;</span>
            </Link>
            <p className="text-[15px] leading-relaxed mb-6">
              Bangladesh er number one online shopping destination. Quality products, best prices, fast delivery.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="w-10 h-10 rounded-lg bg-[#1f2533] flex items-center justify-center hover:bg-[#1877F2] text-white transition-colors">
                <FaFacebookF size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-[#1f2533] flex items-center justify-center hover:bg-[#E4405F] text-white transition-colors">
                <FaInstagram size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-[#1f2533] flex items-center justify-center hover:bg-[#0A66C2] text-white transition-colors">
                <FaLinkedinIn size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-lg bg-[#1f2533] flex items-center justify-center hover:bg-black text-white transition-colors">
                <FaTiktok size={18} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3.5 text-[15px]">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3.5 text-[15px]">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition-colors">Track My Order</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/payment-methods" className="hover:text-white transition-colors">Payment Methods</Link></li>
              <li><Link href="/shipping-info" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us & Payments */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-[15px] mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 mt-0.5" />
                <span>Nawdapara, Rajshahi Sadar, Rajshahi 6000, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <span>+8809611576269 (10am - 10pm)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />
                <span>support@stashhouse.shop</span>
              </li>
            </ul>

            {/* Payment Methods */}
            <div>
              <h4 className="text-gray-400 text-sm font-bold tracking-wider mb-3">WE ACCEPT</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-white w-14 h-9 rounded flex items-center justify-center text-xs font-bold text-[#E2136E]">bKash</div>
                <div className="bg-white w-14 h-9 rounded flex items-center justify-center text-xs font-bold text-[#F37021]">নগদ</div>
                <div className="bg-white w-14 h-9 rounded flex items-center justify-center text-xs font-bold italic text-[#1A1F71]">VISA</div>
                <div className="bg-white w-14 h-9 rounded flex items-center justify-center p-1">
                  <div className="w-4 h-4 rounded-full bg-red-500 -mr-1 mix-blend-multiply"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mix-blend-multiply"></div>
                </div>
                <div className="bg-white w-14 h-9 rounded flex items-center justify-center text-[10px] font-bold text-black text-center leading-tight">COD</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Stash House. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}