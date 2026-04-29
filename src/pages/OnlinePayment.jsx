import { useState } from 'react';
import onlinePaymentHero from '../assets/Online Payment.png';
import { CreditCard, DollarSign, FileText, User, PhoneCall, Mail, MapPin } from 'lucide-react';

const OnlinePayment = () => {
  const [amount, setAmount] = useState('');
  const [clientName, setClientName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');

  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      <div className="w-full">
        <img
          src={onlinePaymentHero}
          alt="Online Payment"
          className="w-full h-auto block"
        />
      </div>

      <section className="py-20 md:py-24 bg-white relative">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E3A5F]/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Payment Form Section */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1E3A5F] to-[#722F37]"></div>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-2">
                  Make a Payment
                </h2>
                <p className="text-slate-600 mb-8">
                  Securely pay your invoice or retainer fee using PayPal.
                </p>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={18} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] outline-none transition-colors"
                        placeholder="Jane Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Description
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FileText size={18} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] outline-none transition-colors"
                        placeholder="Payment for services"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Payment Amount (USD)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign size={18} className="text-slate-400" />
                      </div>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] outline-none transition-colors"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    {/* Placeholder for PayPal Buttons */}
                    <div className="w-full bg-[#FFC439] hover:bg-[#F4BB33] text-slate-900 font-bold rounded-full py-4 flex items-center justify-center gap-3 cursor-pointer transition-colors shadow-md">
                      <CreditCard size={24} />
                      <span className="text-lg">Pay with PayPal</span>
                    </div>
                    <p className="text-center text-xs text-slate-500 mt-4">
                      You will be securely redirected to PayPal to complete your payment.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Office Contact Info Section */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F]/10 rounded-full mb-6 border border-[#1E3A5F]/30 w-fit">
                <span className="text-[#1E3A5F] font-bold text-sm tracking-wide uppercase">Contact Info</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                Need Assistance?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                If you have questions regarding your invoice or experience any issues submitting your payment, please contact our office directly.
              </p>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="space-y-6 text-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <PhoneCall size={20} className="text-[#1E3A5F]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Phone</p>
                      <a href="tel:+12025482999" className="text-slate-600 hover:text-[#722F37] transition-colors block mt-1">(202) 548-2999</a>
                      <a href="tel:+12025488114" className="text-slate-600 hover:text-[#722F37] transition-colors block mt-1">(202) 548-8114</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-[#1E3A5F]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <a href="mailto:lawfirm@pjoutlawlegal.com" className="text-slate-600 hover:text-[#722F37] transition-colors block mt-1">lawfirm@pjoutlawlegal.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-[#1E3A5F]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Office</p>
                      <p className="text-slate-600 mt-1">412 H Street, NE<br />Washington, DC 20002</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlinePayment;
