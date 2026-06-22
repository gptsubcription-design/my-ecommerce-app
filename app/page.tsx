import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20 text-center shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to ShopLogo
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            আপনার দৈনন্দিন প্রয়োজনীয় সব সেরা প্রোডাক্ট এখন এক জায়গায়। সেরা দামে সেরা কোয়ালিটি।
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/products" 
              className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
            <Link 
              href="/categories" 
              className="bg-white text-black border border-gray-300 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section (Dummy Data) */}
      <section className="py-16 container mx-auto px-4 flex-grow">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
              {/* Product Image Placeholder */}
              <div className="bg-gray-200 h-48 rounded-md mb-4 flex items-center justify-center text-gray-500">
                Image {item}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Awesome Product {item}</h3>
              <p className="text-gray-600 mb-4">$99.00</p>
              <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}