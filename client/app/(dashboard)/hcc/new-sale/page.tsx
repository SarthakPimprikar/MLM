'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { plansAPI, salesAPI, epinsAPI } from '@/lib/api';
import { IPlan, IEPin } from '@/types';
import { useToast } from '@/components/ui/Toast';

type Step = 1 | 2 | 3;

interface SaleFormData {
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  customerState: string;
  nomineeName: string;
  nomineeRelation: string;
  planId: string;
  ePinCode: string;
  paymentMethod: 'epin' | 'online';
}

export default function NewSaleWizard() {
  const router = useRouter();
  const { addToast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Data State
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [unusedPins, setUnusedPins] = useState<IEPin[]>([]);

  // Form State
  const [saleForm, setSaleForm] = useState<SaleFormData>({
    customerName: '',
    customerMobile: '',
    customerEmail: '',
    customerState: '',
    nomineeName: '',
    nomineeRelation: '',
    planId: '',
    ePinCode: '',
    paymentMethod: 'epin'
  });

  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const [plansRes, pinsRes] = await Promise.all([
          plansAPI.getAll(),
          epinsAPI.getMyPins()
        ]);
        if (plansRes.data.success) setPlans(plansRes.data.data?.filter(p => p.isCommissionable) || []);
        if (pinsRes.data.success) setUnusedPins(pinsRes.data.data?.unused || []);
      } catch (err) {
        addToast({ message: 'Failed to initialize sales form', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [addToast]);

  const handleNext = () => {
    if (step === 1) {
      if (!saleForm.customerName || !saleForm.customerMobile || !saleForm.nomineeName) {
        addToast({ message: 'Please fill in all required customer details', type: 'warning' });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!saleForm.planId) {
        addToast({ message: 'Please select a wellness plan', type: 'warning' });
        return;
      }
      if (saleForm.paymentMethod === 'epin' && !saleForm.ePinCode) {
        addToast({ message: 'Please select an E-Pin for payment', type: 'warning' });
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await salesAPI.create({
        customerName: saleForm.customerName,
        customerMobile: saleForm.customerMobile,
        planId: saleForm.planId,
        ePinCode: saleForm.ePinCode
      });
      
      if (res.data.success) {
        addToast({ message: 'Policy issued successfully!', type: 'success' });
        router.push('/hcc');
      }
    } catch (err: any) {
      addToast({ message: err.response?.data?.message || 'Transaction failed', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Gujarat', 'Uttar Pradesh', 'West Bengal', 'Tamil Nadu', 'Rajasthan', 'Madhya Pradesh', 'Bihar'];
  const relations = ['Spouse', 'Parent', 'Child', 'Sibling', 'Other'];

  if (loading) return <DashboardLayout pageTitle="New Policy Sale"><div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-hcc border-t-transparent rounded-full animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout pageTitle="Issue New Policy">
      <div className="max-w-4xl mx-auto pb-20">
        {/* Progress Tracker */}
        <div className="flex items-center justify-between mb-12 px-10">
           <ProgressStep step={1} current={step} label="Customer" />
           <div className={`flex-1 h-0.5 mx-4 transition-colors duration-500 ${step > 1 ? 'bg-hcc' : 'bg-white/10'}`} />
           <ProgressStep step={2} current={step} label="Plan" />
           <div className={`flex-1 h-0.5 mx-4 transition-colors duration-500 ${step > 2 ? 'bg-hcc' : 'bg-white/10'}`} />
           <ProgressStep step={3} current={step} label="Confirm" />
        </div>

        <div className="bg-surface border border-white/[0.07] rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
           {/* Step 1: Customer Information */}
           {step === 1 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <SectionHeader title="Customer Information" desc="Primary policy holder and nominee details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <InputField label="Customer Full Name" placeholder="John Doe" val={saleForm.customerName} onChange={(v: string) => setSaleForm(prev => ({...prev, customerName: v}))} required />
                   <InputField label="Mobile Number" placeholder="9876543210" val={saleForm.customerMobile} onChange={(v: string) => setSaleForm(prev => ({...prev, customerMobile: v.replace(/\D/g, '')}))} maxLength={10} required />
                   <InputField label="Email Address" placeholder="john@example.com" val={saleForm.customerEmail} onChange={(v: string) => setSaleForm(prev => ({...prev, customerEmail: v}))} />
                   <SelectField label="Current State" options={states} val={saleForm.customerState} onChange={(v: string) => setSaleForm(prev => ({...prev, customerState: v}))} />
                   <InputField label="Nominee Name" placeholder="Relation's Name" val={saleForm.nomineeName} onChange={(v: string) => setSaleForm(prev => ({...prev, nomineeName: v}))} required />
                   <SelectField label="Relation with Nominee" options={relations} val={saleForm.nomineeRelation} onChange={(v: string) => setSaleForm(prev => ({...prev, nomineeRelation: v}))} />
                </div>
                <div className="mt-12 flex justify-end">
                   <button onClick={handleNext} className="bg-hcc text-[#0d0f14] px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">Next: Select Plan</button>
                </div>
             </div>
           )}

           {/* Step 2: Plan Selection */}
           {step === 2 && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <SectionHeader title="Choose Wellness Coverage" desc="Select a commissionable plan for the customer" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                   {plans.map((plan) => (
                      <button 
                        key={plan._id}
                        onClick={() => {
                          setSaleForm(prev => ({...prev, planId: plan._id, ePinCode: ''}));
                          setSelectedPlan(plan);
                        }}
                        className={`p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden group ${saleForm.planId === plan._id ? 'bg-hcc/10 border-hcc shadow-xl shadow-hcc/5' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
                      >
                         <div className="text-xs font-black text-muted uppercase tracking-widest mb-1 group-hover:text-white transition-colors">{plan.name}</div>
                         <div className="text-2xl font-display font-bold text-white mb-4">₹{(plan.price / 100).toLocaleString('en-IN')}</div>
                         <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-tighter">
                            <span className="text-muted">GST Inclusive</span>
                            <span className="text-hcc">Earn: ₹{((plan.businessVolume * 0.4) / 100).toLocaleString('en-IN')}</span>
                         </div>
                      </button>
                   ))}
                </div>

                {selectedPlan && (
                  <div className="p-8 bg-surface2 border border-white/10 rounded-[32px] mb-8 animate-in zoom-in-95">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-hba/10 border border-hba/20 flex items-center justify-center text-hba">🔑</div>
                        <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">Payment Method</h4>
                     </div>
                     
                     <div className="flex gap-4 mb-6">
                        <button 
                          onClick={() => setSaleForm(prev => ({...prev, paymentMethod: 'epin'}))}
                          className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${saleForm.paymentMethod === 'epin' ? 'bg-white text-black border-white' : 'text-muted border-white/10'}`}
                        >
                           Use E-Pin
                        </button>
                        <button 
                          disabled
                          className="flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/5 text-muted/30 cursor-not-allowed"
                        >
                           Online (Coming Soon)
                        </button>
                     </div>

                     {saleForm.paymentMethod === 'epin' && (
                        <div className="space-y-3">
                           <p className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Available Matching Pins</p>
                           <select 
                             value={saleForm.ePinCode}
                             onChange={(e) => setSaleForm(prev => ({...prev, ePinCode: e.target.value}))}
                             className="w-full bg-bg border border-white/10 rounded-xl px-5 py-4 text-sm font-mono font-bold text-hba outline-none focus:border-hba/50 appearance-none"
                           >
                              <option value="">Select an E-Pin</option>
                              {unusedPins.filter(p => p.value === selectedPlan.price).map(pin => (
                                 <option key={pin._id} value={pin.pinCode}>{pin.pinCode}</option>
                              ))}
                           </select>
                           {unusedPins.filter(p => p.value === selectedPlan.price).length === 0 && (
                              <p className="text-[10px] text-hcm font-bold uppercase tracking-tight mt-2">No matching ₹{(selectedPlan.price/100)} pins available in your wallet.</p>
                           )}
                        </div>
                     )}
                  </div>
                )}

                <div className="flex justify-between mt-12">
                   <button onClick={() => setStep(1)} className="text-[10px] font-bold text-muted uppercase tracking-widest hover:text-white">Back</button>
                   <button onClick={handleNext} className="bg-hcc text-[#0d0f14] px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">Review Order</button>
                </div>
             </div>
           )}

           {/* Step 3: Review & Confirm */}
           {step === 3 && selectedPlan && (
             <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <SectionHeader title="Review & Confirm" desc="Verify all details before issuing the policy" />
                
                <div className="space-y-4 mb-10">
                   <ReviewItem label="Customer" val={saleForm.customerName} sub={saleForm.customerMobile} />
                   <ReviewItem label="Nominee" val={saleForm.nomineeName} sub={saleForm.nomineeRelation} />
                   <ReviewItem label="Wellness Plan" val={selectedPlan.name} sub={`₹${(selectedPlan.price/100).toLocaleString('en-IN')}`} />
                   <ReviewItem label="Payment Source" val={`E-Pin: ${saleForm.ePinCode}`} sub="Immediate Activation" />
                   
                   <div className="p-6 bg-sh/5 border border-sh/10 rounded-3xl flex justify-between items-center">
                      <div>
                         <p className="text-[10px] font-black text-sh uppercase tracking-widest">Expected Commission</p>
                         <p className="text-[9px] text-sh/60 font-medium uppercase mt-0.5">Will be added to provisional wallet</p>
                      </div>
                      <div className="text-xl font-display font-bold text-sh">₹{((selectedPlan.businessVolume * 0.4) / 100).toLocaleString('en-IN')}</div>
                   </div>
                </div>

                <div className="flex flex-col gap-4">
                   <button 
                     disabled={submitting}
                     onClick={handleSubmit}
                     className="w-full py-5 rounded-2xl bg-hcc text-[#0d0f14] font-black text-sm uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-hcc/20"
                   >
                     {submitting ? 'Issuing Policy...' : 'Confirm & Finalize Sale'}
                   </button>
                   <button onClick={() => setStep(2)} className="py-2 text-[10px] font-bold text-muted uppercase tracking-widest hover:text-white">Edit Selection</button>
                </div>
             </div>
           )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function ProgressStep({ step, current, label }: { step: number; current: number; label: string }) {
  const isActive = current >= step;
  const isCurrent = current === step;
  return (
    <div className="flex flex-col items-center gap-2">
       <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all duration-500 ${isActive ? 'bg-hcc border-hcc text-black' : 'border-white/10 text-white/20'}`}>
          {step}
       </div>
       <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-500 ${isCurrent ? 'text-white' : 'text-muted'}`}>{label}</span>
    </div>
  );
}

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-10">
       <h3 className="font-display text-2xl font-bold text-white tracking-tight">{title}</h3>
       <p className="text-xs text-muted font-medium uppercase tracking-widest mt-1">{desc}</p>
    </div>
  );
}

function InputField({ label, placeholder, val, onChange, required, maxLength }: any) {
  return (
    <div className="space-y-2">
       <p className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">{label} {required && '*'}</p>
       <input 
         required={required}
         maxLength={maxLength}
         type="text"
         value={val}
         onChange={(e) => onChange(e.target.value)}
         placeholder={placeholder}
         className="w-full bg-surface2 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:border-hcc/50 transition-all placeholder:opacity-20"
       />
    </div>
  );
}

function SelectField({ label, options, val, onChange }: any) {
  return (
    <div className="space-y-2">
       <p className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">{label}</p>
       <select 
         value={val}
         onChange={(e) => onChange(e.target.value)}
         className="w-full bg-surface2 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:border-hcc/50 appearance-none"
       >
          <option value="">Select...</option>
          {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
       </select>
    </div>
  );
}

function ReviewItem({ label, val, sub }: any) {
  return (
    <div className="flex justify-between items-center p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
       <div className="text-[10px] font-black text-muted uppercase tracking-widest">{label}</div>
       <div className="text-right">
          <div className="text-sm font-bold text-white">{val}</div>
          <div className="text-[10px] font-medium text-muted uppercase">{sub}</div>
       </div>
    </div>
  );
}
