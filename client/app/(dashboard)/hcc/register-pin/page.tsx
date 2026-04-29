'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function RegisterWithPin() {
  return (
    <DashboardLayout pageTitle="Use Pin to Register">
      <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03] max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Register New Member</h2>
        <div className="space-y-6">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">Select Available E-Pin</h3>
            <select className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none">
              <option>CB-PRE-9921 (Basic Plan)</option>
              <option>CB-PRE-9922 (Basic Plan)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">New Member Mobile</label>
            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#60A5FA]" placeholder="+91" />
          </div>
          <button className="w-full bg-[#60A5FA] py-4 rounded-xl font-bold text-black hover:brightness-110 transition-all shadow-lg shadow-[#60A5FA]/20">
            Register Member
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
