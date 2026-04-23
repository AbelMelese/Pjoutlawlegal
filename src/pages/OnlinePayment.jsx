import onlinePaymentHero from '../assets/Online Payment.png';

const OnlinePayment = () => {
  return (
    <div className="overflow-hidden bg-[#f8fafc]">
      <div className="w-full">
        <img
          src={onlinePaymentHero}
          alt="Online Payment"
          className="w-full h-auto block"
        />
      </div>

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
                Office Contact
              </h2>
              <div className="space-y-3 text-slate-700">
                <p><a href="tel:+12025482999">(202) 548-2999</a></p>
                <p><a href="tel:+12025488114">(202) 548-8114</a></p>
                <p><a href="mailto:lawfirm@pjoutlawlegal.com">lawfirm@pjoutlawlegal.com</a></p>
                <p>412 H Street, NE, Washington, DC 20002</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlinePayment;
