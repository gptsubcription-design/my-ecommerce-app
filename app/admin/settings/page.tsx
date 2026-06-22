"use client";

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, UploadCloud, X, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Text Data States
  const [websiteTitle, setWebsiteTitle] = useState("");
  const [aboutText, setAboutText] = useState("");

  // Dynamic Lists States
  const [headerMenus, setHeaderMenus] = useState([{ label: "Shop", link: "/shop" }]);
  const [socialLinks, setSocialLinks] = useState([{ platform: "Facebook", url: "" }]);

  // Image File & Preview States (For new uploads)
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [newPaymentFiles, setNewPaymentFiles] = useState<{ file: File; preview: string }[]>([]);

  // Live URLs (Fetched from DB or generated after upload)
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const [paymentUrls, setPaymentUrls] = useState<string[]>([]);

  // 1. Fetch existing settings from Database
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.websiteTitle) setWebsiteTitle(data.websiteTitle);
          if (data.aboutText) setAboutText(data.aboutText);
          if (data.headerMenus && data.headerMenus.length > 0) setHeaderMenus(data.headerMenus);
          if (data.socialLinks && data.socialLinks.length > 0) setSocialLinks(data.socialLinks);
          if (data.logoUrl) setLogoUrl(data.logoUrl);
          if (data.faviconUrl) setFaviconUrl(data.faviconUrl);
          if (data.paymentUrls) setPaymentUrls(data.paymentUrls);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  // 2. Upload function for ImgBB
  const uploadToImgBB = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.data.url;
  };

  // 3. Save everything to Database
  const handleSave = async () => {
    setIsSaving(true);
    try {
      let finalLogo = logoUrl;
      let finalFavicon = faviconUrl;
      let finalPayments = [...paymentUrls];

      // Upload newly selected images
      if (logoFile) finalLogo = await uploadToImgBB(logoFile);
      if (faviconFile) finalFavicon = await uploadToImgBB(faviconFile);
      
      for (let item of newPaymentFiles) {
        const uploadedUrl = await uploadToImgBB(item.file);
        finalPayments.push(uploadedUrl);
      }

      // Prepare payload for MongoDB
      const payload = {
        websiteTitle,
        aboutText,
        headerMenus,
        socialLinks,
        logoUrl: finalLogo,
        faviconUrl: finalFavicon,
        paymentUrls: finalPayments,
      };

      // Save to MongoDB via our API
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Settings saved successfully!");
        // Reset file states so they don't re-upload
        setLogoFile(null);
        setFaviconFile(null);
        setNewPaymentFiles([]);
        
        // Update Live URLs
        setLogoUrl(finalLogo);
        setFaviconUrl(finalFavicon);
        setPaymentUrls(finalPayments);
      } else {
        alert("Failed to save settings to database.");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  // 4. File Handlers
  const handleSingleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      if (type === 'logo') {
        setLogoFile(file);
        setLogoUrl(preview); // Temporary local preview
      }
      if (type === 'favicon') {
        setFaviconFile(file);
        setFaviconUrl(preview);
      }
    }
  };

  const handlePaymentImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newItems = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setNewPaymentFiles(prev => [...prev, ...newItems]);
  };

  const removeLivePaymentIcon = (index: number) => {
    setPaymentUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeNewPaymentIcon = (index: number) => {
    setNewPaymentFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 5. Dynamic List Handlers
  const updateMenu = (index: number, field: string, value: string) => {
    const newMenus = [...headerMenus];
    newMenus[index] = { ...newMenus[index], [field]: value };
    setHeaderMenus(newMenus);
  };
  const addMenu = () => setHeaderMenus([...headerMenus, { label: "", link: "" }]);
  const removeMenu = (index: number) => setHeaderMenus(headerMenus.filter((_, i) => i !== index));

  const updateSocial = (index: number, field: string, value: string) => {
    const newSocials = [...socialLinks];
    newSocials[index] = { ...newSocials[index], [field]: value };
    setSocialLinks(newSocials);
  };
  const addSocial = () => setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  const removeSocial = (index: number) => setSocialLinks(socialLinks.filter((_, i) => i !== index));

  if (isLoading) {
    return <div className="flex h-[60vh] items-center justify-center text-gray-500 font-medium">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-500 mt-1">Manage your website's header, footer, and general information.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition shadow-sm cursor-pointer disabled:opacity-70"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6">
        
        {/* 1. General & Brand Settings */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Website Title</label>
              <input 
                type="text" 
                value={websiteTitle}
                onChange={(e) => setWebsiteTitle(e.target.value)}
                placeholder="Onecarta | Best Online Shop" 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition" 
              />
            </div>
            
            {/* Favicon Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Favicon Upload</label>
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer relative overflow-hidden h-32 flex flex-col items-center justify-center">
                <input type="file" accept="image/png, image/icon, image/jpeg" className="hidden" onChange={(e) => handleSingleImageChange(e, 'favicon')} />
                {faviconUrl ? (
                  <img src={faviconUrl} alt="Favicon" className="h-full w-full object-contain" />
                ) : (
                  <>
                    <UploadCloud size={24} className="mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload .ico or .png</span>
                  </>
                )}
              </label>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Header Logo Upload</label>
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer relative overflow-hidden h-32 flex flex-col items-center justify-center">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSingleImageChange(e, 'logo')} />
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="h-full w-full object-contain" />
                ) : (
                  <>
                    <UploadCloud size={24} className="mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload logo image</span>
                  </>
                )}
              </label>
            </div>
          </div>
        </section>

        {/* 2. Header Menu Settings */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Header Menus</h2>
            <button onClick={addMenu} className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-200 flex items-center gap-1 font-medium transition cursor-pointer">
              <Plus size={16} /> Add Menu Link
            </button>
          </div>
          
          <div className="space-y-3">
            {headerMenus.map((menu, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <input 
                  type="text" 
                  value={menu.label}
                  onChange={(e) => updateMenu(idx, 'label', e.target.value)}
                  placeholder="Menu Text (e.g., Shop)" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <input 
                  type="text" 
                  value={menu.link}
                  onChange={(e) => updateMenu(idx, 'link', e.target.value)}
                  placeholder="URL (e.g., /shop)" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <button onClick={() => removeMenu(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition cursor-pointer" title="Remove">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Footer Settings */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100">Footer Settings</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">About Us Text</label>
            <textarea 
              rows={3} 
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              placeholder="Bangladesh er number one online shopping destination..." 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Social Links */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-semibold text-gray-700">Social Media Links</label>
                <button onClick={addSocial} className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer"><Plus size={18} /></button>
              </div>
              <div className="space-y-3">
                {socialLinks.map((social, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={social.platform}
                      onChange={(e) => updateSocial(idx, 'platform', e.target.value)}
                      placeholder="Platform" 
                      className="w-1/3 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    <input 
                      type="text" 
                      value={social.url}
                      onChange={(e) => updateSocial(idx, 'url', e.target.value)}
                      placeholder="URL" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    <button onClick={() => removeSocial(idx)} className="text-red-500 p-1 hover:bg-red-50 rounded-md cursor-pointer"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method Icons</label>
              <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer mb-4">
                <input type="file" accept="image/*" multiple className="hidden" onChange={handlePaymentImages} />
                <UploadCloud size={24} className="mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 block">Click to upload multiple images</span>
                <span className="text-xs text-gray-400 mt-1 block">(bKash, Nagad, Visa, etc.)</span>
              </label>

              <div className="flex flex-wrap gap-3">
                {/* Already Saved Icons */}
                {paymentUrls.map((url, idx) => (
                  <div key={`live-${idx}`} className="relative w-16 h-12 border border-gray-200 rounded-md overflow-hidden bg-white">
                    <img src={url} alt="Payment" className="w-full h-full object-contain p-1" />
                    <button onClick={() => removeLivePaymentIcon(idx)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600 cursor-pointer">
                      <X size={12} />
                    </button>
                  </div>
                ))}

                {/* Newly Selected Icons (Not saved yet) */}
                {newPaymentFiles.map((item, idx) => (
                  <div key={`new-${idx}`} className="relative w-16 h-12 border border-green-400 rounded-md overflow-hidden bg-white">
                    <img src={item.preview} alt="New Payment" className="w-full h-full object-contain p-1" />
                    <button onClick={() => removeNewPaymentIcon(idx)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600 cursor-pointer">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}