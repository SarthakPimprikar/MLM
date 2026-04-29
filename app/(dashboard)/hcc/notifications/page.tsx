'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function Notifications() {
  return (
    <DashboardLayout pageTitle="Notifications">
      <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03] max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Recent Alerts</h2>
          <button className="text-[10px] font-black text-[#60A5FA] uppercase tracking-widest hover:underline">Mark all as read</button>
        </div>
        <div className="space-y-4">
          {[
            { title: 'Commission Paid', time: '2 hours ago', desc: 'Your commission for cycle JUN-W4 has been credited.' },
            { title: 'New Rank Achieved', time: 'Yesterday', desc: 'Congratulations! You have reached Entry Level.' }
          ].map((n, i) => (
            <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#60A5FA]/30 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold group-hover:text-[#60A5FA] transition-colors">{n.title}</h3>
                <span className="text-[10px] text-white/30 font-bold">{n.time}</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
