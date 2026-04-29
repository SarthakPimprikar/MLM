'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { epinsAPI } from '@/lib/api';
import { IEPin } from '@/types';

export default function HCCEPins() {
  const [pins, setPins] = useState<{ unused: IEPin[]; used: IEPin[]; totalUnused: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'unused' | 'used'>('unused');

  useEffect(() => {
    async function fetchPins() {
      try {
        const res = await epinsAPI.getMyPins();
        if (res.data.success) setPins(res.data.data || null);
      } catch (err) {
        console.error('Pins fetch failed', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPins();
  }, []);

  return (
    <DashboardLayout pageTitle="E-Pin Wallet">
      <div className="space-y-8">
        {/* Inventory Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-hcc/5 blur-3xl -mr-12 -mt-12" />
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Available Pins</p>
            <h3 className="text-3xl font-display font-bold text-white">{pins?.totalUnused || 0}</h3>
            <p className="text-[10px] text-hcc font-bold mt-2 uppercase tracking-tighter">Ready for activation</p>
          </div>
          
          <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 opacity-60">
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Blocked/Expired</p>
            <h3 className="text-3xl font-display font-bold text-white">0</h3>
            <p className="text-[10px] text-muted font-bold mt-2 uppercase tracking-tighter">Invalidated pins</p>
          </div>

          <div className="md:col-span-1 bg-hcc/10 border border-hcc/20 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-tight">Need more pins?</h4>
              <p className="text-[10px] text-hcc font-medium mt-1">Request from your upline HCM</p>
            </div>
            <button className="bg-hcc text-[#0d0f14] px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">
              Request
            </button>
          </div>
        </div>

        {/* Pin List */}
        <div className="bg-surface border border-white/[0.07] rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex border-b border-white/[0.07]">
            <button
              onClick={() => setActiveTab('unused')}
              className={`flex-1 py-5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === 'unused' ? 'text-hcc border-b-2 border-hcc bg-hcc/5' : 'text-muted hover:text-white'
              }`}
            >
              Unused Inventory ({pins?.unused.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('used')}
              className={`flex-1 py-5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === 'used' ? 'text-hcc border-b-2 border-hcc bg-hcc/5' : 'text-muted hover:text-white'
              }`}
            >
              Consumed History ({pins?.used.length || 0})
            </button>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="py-20 flex justify-center"><div className="w-6 h-6 border-2 border-hcc border-t-transparent rounded-full animate-spin" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(activeTab === 'unused' ? pins?.unused : pins?.used)?.map((pin) => (
                  <div key={pin._id} className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 hover:border-hcc/30 transition-all group relative">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-surface2 border border-white/[0.07] flex items-center justify-center text-lg shadow-inner group-hover:scale-110 transition-transform">
                        {activeTab === 'unused' ? '🔑' : '✔️'}
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-muted font-bold uppercase tracking-widest">Pin Value</div>
                        <div className="text-lg font-display font-bold text-white">₹{(pin.value / 100).toLocaleString('en-IN')}</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-[9px] text-muted font-bold uppercase tracking-tighter mb-1">Electronic Pin Code</div>
                        <div className="bg-bg border border-white/[0.07] rounded-lg px-3 py-2 text-sm font-mono font-bold text-hcc tracking-widest flex justify-between items-center group-hover:border-hcc/20">
                          {pin.pinCode}
                          <button 
                            onClick={() => navigator.clipboard.writeText(pin.pinCode)}
                            className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
                          >
                            COPY
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest border-t border-white/[0.04] pt-3">
                        <span className="text-muted">Associated Plan:</span>
                        <span className="text-white">{pin.plan.name}</span>
                      </div>
                      
                      {activeTab === 'used' && (
                        <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-sh/80">
                          <span>Used Date:</span>
                          <span>{new Date(pin.usedDate!).toLocaleDateString('en-IN')}</span>
                        </div>
                      )}
                    </div>
                    
                    {activeTab === 'unused' && (
                      <div className="mt-4 pt-4 border-t border-white/[0.04] flex gap-2">
                        <button className="flex-1 py-2 rounded-lg bg-white/[0.05] border border-white/[0.07] text-[9px] font-bold text-white uppercase tracking-widest hover:bg-white/[0.1] transition-all">
                          Transfer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!loading && (activeTab === 'unused' ? pins?.unused : pins?.used)?.length === 0 && (
              <div className="py-20 text-center">
                <div className="text-4xl mb-4 opacity-10">🎫</div>
                <p className="text-xs text-muted font-bold uppercase tracking-widest">No pins found in this section</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
