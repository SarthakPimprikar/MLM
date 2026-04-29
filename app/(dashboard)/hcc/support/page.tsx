'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Support() {
  return (
    <DashboardLayout pageTitle="Support & Help">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
          <h2 className="text-2xl font-bold mb-6">Raise a Ticket</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Subject</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" placeholder="Issue title" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Message</label>
              <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white h-32" placeholder="Describe your issue..."></textarea>
            </div>
            <button className="w-full bg-[#60A5FA] py-4 rounded-xl font-bold text-black hover:brightness-110 transition-all">
              Submit Ticket
            </button>
          </form>
        </div>
        <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
          <h2 className="text-2xl font-bold mb-6">Contact Info</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Phone Support</p>
                <p className="text-lg font-bold">+91 1800-XXX-XXXX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
