import Link from 'next/link';
import { 
  Phone, Package, Gift, BookOpen, CreditCard, MapPin, 
  Search, Heart, ShoppingCart, User, Menu, ChevronDown, 
  Home, ShoppingBag, Info, HelpCircle 
} from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full font-sans">
      {/* 1. Top Bar */}
      <div className="bg-[#f8f8f8] border-b border-gray-200 py-2 px-4 text-[13px] text-gray-600 font-medium">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>01303223513</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/order-status" className="flex items-center gap-1.5 hover:text-black"><Package size={14}/> ORDER STATUS</Link>
            <Link href="/gift" className="flex items-center gap-1.5 hover:text-black"><Gift size={14}/> GIFT</Link>
            <Link href="/blogs" className="flex items-center gap-1.5 hover:text-black"><BookOpen size={14}/> BLOGS</Link>
            <Link href="/emi-policy" className="flex items-center gap-1.5 hover:text-black"><CreditCard size={14}/> EMI POLICY</Link>
            <Link href="/store-location" className="flex items-center gap-1.5 hover:text-black"><MapPin size={14}/> STORE LOCATION</Link>
          </div>
        </div>
      </div>

      {/* 2. Middle Main Header */}
      <div className="bg-[#1c1c28] text-white py-5 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold tracking-wide">
            Stash House<span className="text-sm align-top">&reg;</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 w-full max-w-3xl flex">
            <input 
              type="text" 
              placeholder="Wireless H" 
              className="w-full px-4 py-3 text-black outline-none rounded-l-md"
            />
            <button className="bg-[#2a2a40] hover:bg-[#343450] px-6 py-3 rounded-r-md transition-colors">
              <Search size={20} className="text-white" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/offer" className="border border-gray-500 hover:border-white rounded-md px-4 py-2.5 flex items-center gap-2 text-sm font-semibold transition-colors">
              <Gift size={18} /> OFFER
            </Link>
            <Link href="/wishlist" className="border border-gray-500 hover:border-white rounded-md px-4 py-2.5 flex items-center gap-2 text-sm font-semibold transition-colors">
              <Heart size={18} /> WISHLIST
            </Link>
            <Link href="/cart" className="border border-gray-500 hover:border-white rounded-md px-4 py-2.5 flex items-center gap-2 text-sm font-semibold transition-colors">
              <ShoppingCart size={18} /> CART
            </Link>
            <Link href="/login" className="border border-gray-500 hover:border-white rounded-md px-4 py-2.5 flex items-center gap-2 text-sm font-semibold transition-colors">
              <User size={18} /> LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Bottom Navigation Bar */}
      <div className="bg-white border-b shadow-sm hidden md:block">
        <div className="container mx-auto flex items-stretch h-14">
          {/* All Category Dropdown Button */}
          <button className="bg-[#1c1c28] text-white px-6 flex items-center justify-between w-64 font-semibold shrink-0">
            <div className="flex items-center gap-2">
              <Menu size={20} />
              All Category
            </div>
            <ChevronDown size={18} />
          </button>

          {/* Nav Links */}
          <nav className="flex-1 flex items-center px-8 gap-8 text-[14px] font-bold text-gray-700">
            <Link href="/" className="flex items-center gap-2 hover:text-black">
              <Home size={16} className="text-gray-400" /> HOME
            </Link>
            <Link href="/special-offers" className="flex items-center gap-2 text-[#e53935] hover:text-red-700">
              <Gift size={16} /> SPECIAL OFFERS
            </Link>
            <Link href="/shop" className="flex items-center gap-2 hover:text-black">
              <ShoppingBag size={16} className="text-gray-400" /> SHOP
            </Link>
            <Link href="/our-story" className="flex items-center gap-2 hover:text-black">
              <Info size={16} className="text-gray-400" /> OUR STORY
            </Link>
            <Link href="/support" className="flex items-center gap-2 hover:text-black">
              <HelpCircle size={16} className="text-gray-400" /> SUPPORT
            </Link>
          </nav>

          {/* New Arrivals Badge */}
          <div className="bg-[#1c1c28] text-white px-8 flex items-center font-bold text-[14px] tracking-wide shrink-0">
            NEW ARRIVALS
          </div>
        </div>
      </div>
    </header>
  );
}