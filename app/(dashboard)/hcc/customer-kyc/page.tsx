'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function CustomerKYC() {
  return (
    <DashboardLayout pageTitle="Customer KYC Form">
      <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03] max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">New Customer KYC</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Full Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#60A5FA]" placeholder="Customer Name" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Mobile Number</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#60A5FA]" placeholder="+91" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Aadhar Number</label>
            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#60A5FA]" placeholder="XXXX XXXX XXXX" />
          </div>
          <button className="w-full bg-[#6029F1] py-4 rounded-xl font-bold text-white hover:brightness-110 transition-all shadow-lg shadow-[#6029F1]/20">
            Submit KYC Form
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
