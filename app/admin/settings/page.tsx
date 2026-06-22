"use client";

import { Save, Plus, Trash2, UploadCloud } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-500 mt-1">Manage your website's header, footer, and general information.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition shadow-sm">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        
        {/* 1. General & Brand Settings */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Website Title</label>
              <input type="text" placeholder="Onecarta | Best Online Shop" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Favicon Upload</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer">
                <UploadCloud size={24} className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload .ico or .png</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Header Logo Upload</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer">
                <UploadCloud size={24} className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload logo image</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Header Menu Settings */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Header Menus</h2>
            <button className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 flex items-center gap-1 font-medium transition">
              <Plus size={16} /> Add Menu Link
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Example of a dynamic input row */}
            <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <input type="text" placeholder="Menu Text (e.g., Shop)" defaultValue="Shop" className="flex-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="URL Link (e.g., /shop)" defaultValue="/shop" className="flex-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-md transition" title="Remove">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* 3. Footer Settings */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100">Footer Settings</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">About Us Text</label>
            <textarea rows={3} placeholder="Bangladesh er number one online shopping destination..." className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Social Links */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-semibold text-gray-700">Social Media Links</label>
                <button className="text-blue-600 hover:text-blue-800 p-1"><Plus size={18} /></button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="text" placeholder="Platform" defaultValue="Facebook" className="w-1/3 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  <input type="text" placeholder="URL" defaultValue="https://facebook.com/..." className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method Icons</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer">
                <UploadCloud size={24} className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 block">Click to upload multiple images</span>
                <span className="text-xs text-gray-400 mt-1 block">(bKash, Nagad, Visa, etc.)</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}