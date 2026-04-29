'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { authAPI, epinsAPI } from '@/lib/api';

export default function AdminEpinsPage() {
  const [user, setUser] = useState<any>({});
  const [form, setForm] = useState({ planId: '', quantity: 10, assignToUserId: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const mockInventory = [
    { id: 'PIN-99201', plan: 'Super Suraksha', qty: 50, status: 'AVAILABLE', date: '2024-05-12' },
    { id: 'PIN-99182', plan: 'Premium Shield', qty: 25, status: 'USED', date: '2024-05-10' },
    { id: 'PIN-99175', plan: 'Family Guard', qty: 100, status: 'PENDING', date: '2024-05-08' },
  ];

  useEffect(() => { 
    authAPI.getMe().then((r) => setUser(r.data.data || {})); 
  }, []);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      const r = await epinsAPI.generate(form);
      setSuccess(`✅ Generated ${r.data.count} pins successfully`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate pins');
    } finally { setLoading(false); }
  }

  return (
    <DashboardLayout pageTitle="E-Pin Management">
      <div className="space-y-6 pb-20">
        {/* Header Section */}
        <div className="bg-[#131241] rounded-[2rem] p-8 mb-8 border border-white/[0.03] shadow-xl text-white">
           <div className="flex justify-between items-center mb-6">
              <div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">CUREBHARAT / ADMIN / E-PIN MANAGEMENT</p>
                 <h1 className="text-3xl font-bold font-display">E-Pin Inventory</h1>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#6029F1]/10 border border-[#6029F1]/20 text-[#6029F1] text-[9px] font-black uppercase tracking-widest">
                 System Secured
              </div>
           </div>
           <p className="text-sm text-white/50 font-medium max-w-2xl leading-relaxed">Generate, assign, and track E-Pins for policy activations. Ensure bulk distribution to State Heads and HBAs is logged for audit purposes.</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <PinStat label="TOTAL GENERATED" value="12.4K" sub="Across all plans" icon="box" color="text-[#60A5FA]" />
           <PinStat label="AVAILABLE PINS" value="4,821" sub="Ready for activation" icon="check" color="text-[#34d399]" />
           <PinStat label="USED PINS" value="7,104" sub="Policy linked" icon="link" color="text-[#fbbf24]" />
           <PinStat label="PENDING ASSIGN" value="450" sub="In transfer queue" icon="clock" color="text-[#f87171]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Left Column: Generate Form */}
           <div className="lg:col-span-5 bg-[#131241] rounded-[2rem] p-10 text-white shadow-xl border border-white/[0.03]">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-10 h-10 rounded-xl bg-[#6029F1]/10 flex items-center justify-center text-[#6029F1]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3-3.5 3.5z"></path></svg>
                 </div>
                 <h3 className="text-xl font-bold font-display">Generate Bulk Pins</h3>
              </div>

              <form onSubmit={handleGenerate} className="space-y-6">
                 <div>
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-3">Select Product Plan</label>
                    <select 
                       className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:border-[#6029F1]/50 transition-all appearance-none"
                       value={form.planId}
                       onChange={(e) => setForm({...form, planId: e.target.value})}
                    >
                       <option value="">Select a plan...</option>
                       <option value="1">Super Suraksha (₹1,999)</option>
                       <option value="2">Premium Shield (₹4,999)</option>
                       <option value="3">Family Guard (₹9,999)</option>
                    </select>
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-3">Quantity (Max 500)</label>
                    <input 
                       type="number" 
                       placeholder="10"
                       min={1} max={500}
                       value={form.quantity}
                       onChange={(e) => setForm({...form, quantity: parseInt(e.target.value)})}
                       className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl font-display font-black text-white outline-none focus:border-[#6029F1]/50 transition-all"
                    />
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-3">Assign To (Optional)</label>
                    <input 
                       type="text" 
                       placeholder="Member ID (e.g. CB-9021)"
                       value={form.assignToUserId}
                       onChange={(e) => setForm({...form, assignToUserId: e.target.value})}
                       className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium text-white outline-none focus:border-[#6029F1]/50 transition-all"
                    />
                 </div>

                 {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold">{error}</div>}
                 {success && <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold">{success}</div>}

                 <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#6029F1] hover:brightness-110 py-5 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-lg shadow-[#6029F1]/20 transition-all active:scale-95 disabled:opacity-50"
                 >
                    {loading ? 'Processing...' : 'Generate & Authorize'}
                 </button>
              </form>
           </div>

           {/* Right Column: Inventory History */}
           <div className="lg:col-span-7 bg-[#131241] rounded-[2rem] shadow-xl border border-white/[0.03] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                 <h3 className="text-xl font-bold font-display text-white">Recent Batches</h3>
                 <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Global Inventory</span>
              </div>
              
              <div className="divide-y divide-white/5">
                 {mockInventory.map((item) => (
                    <div key={item.id} className="p-8 hover:bg-white/[0.02] transition-all group">
                       <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#60A5FA]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                             </div>
                             <div>
                                <h4 className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors">{item.plan}</h4>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{item.id} · {item.date}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-xl font-bold font-display text-white">{item.qty} PINS</p>
                             <span className={`text-[8px] font-black px-2 py-0.5 rounded border tracking-widest ${
                                item.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                item.status === 'USED' ? 'bg-white/5 text-white/40 border-white/10' :
                                'bg-amber-500/10 text-amber-500 border-amber-500/20'
                             }`}>
                                {item.status}
                             </span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              
              <div className="p-8 text-center bg-white/[0.01]">
                 <button className="text-[10px] font-black text-[#60A5FA] uppercase tracking-widest hover:underline">View Full Inventory Report</button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function PinStat({ label, value, sub, icon, color }: any) {
  return (
    <div className="bg-[#131241] rounded-[1.5rem] p-6 text-white shadow-xl border border-white/[0.03] relative group">
       <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">{label}</p>
       <p className="text-3xl font-bold font-display mb-2">{value}</p>
       <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{sub}</p>
       <div className={`absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-40 ${color}`}>
          {icon === 'box' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>}
          {icon === 'check' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
          {icon === 'link' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>}
          {icon === 'clock' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
       </div>
    </div>
  );
}
