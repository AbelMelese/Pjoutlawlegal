import { useEffect, useRef, useState } from 'react';
import onlinePaymentHero from '../assets/Online Payment.png';
import {
  DollarSign,
  FileText,
  User,
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';

// Backend URL defaults to empty string for same-domain Netlify Edge Functions.
const API_BASE =
  import.meta.env.VITE_API_BASE || '';

let paypalSdkPromise;

const readPaymentError = async (res, fallbackMessage) => {
  const data = await res.json().catch(() => ({}));
  return data.error || fallbackMessage;
};

const createPayPalOrder = async ({ amount, description, clientName }) => {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: Number(amount).toFixed(2),
      description,
      clientName,
    }),
  });

  if (!res.ok) {
    throw new Error(await readPaymentError(res, 'Could not create payment.'));
  }

  const data = await res.json();
  if (!data.id) {
    throw new Error('PayPal did not return an order ID.');
  }

  return data.id;
};

const capturePayPalOrder = async (orderID) => {
  const res = await fetch(
    `${API_BASE}/api/orders/${encodeURIComponent(orderID)}/capture`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!res.ok) {
    throw new Error(await readPaymentError(res, 'Payment capture failed.'));
  }

  const captureData = await res.json();
  const capture = captureData?.purchase_units?.[0]?.payments?.captures?.[0];

  if (!capture || capture.status !== 'COMPLETED') {
    throw new Error(`Payment capture status: ${capture?.status || 'unknown'}`);
  }

  return capture;
};

const loadPayPalSdk = async () => {
  if (window.paypal?.Buttons) return window.paypal;
  if (paypalSdkPromise) return paypalSdkPromise;

  paypalSdkPromise = fetch(`${API_BASE}/api/paypal/config`)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(
          await readPaymentError(res, 'PayPal is temporarily unavailable.')
        );
      }
      return res.json();
    })
    .then(({ clientId, currency = 'USD' }) => {
      if (!clientId) throw new Error('PayPal is not configured.');

      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const query = new URLSearchParams({
          'client-id': clientId,
          currency,
          components: 'buttons,funding-eligibility',
          'enable-funding': 'card',
        });

        script.id = 'paypal-js-sdk';
        script.src = `https://www.paypal.com/sdk/js?${query.toString()}`;
        script.async = true;
        script.onload = () =>
          window.paypal?.Buttons
            ? resolve(window.paypal)
            : reject(new Error('PayPal checkout could not be initialized.'));
        script.onerror = () =>
          reject(new Error('PayPal checkout could not be loaded.'));
        document.head.appendChild(script);
      });
    })
    .catch((error) => {
      paypalSdkPromise = undefined;
      throw error;
    });

  return paypalSdkPromise;
};

const OnlinePayment = () => {
  const [amount, setAmount] = useState('');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle | processing | success | error
  const [statusMessage, setStatusMessage] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const [paypalSdkStatus, setPaypalSdkStatus] = useState('loading');
  const [cardEligibilityChecked, setCardEligibilityChecked] = useState(false);
  const [cardAvailable, setCardAvailable] = useState(false);
  const paypalButtonRef = useRef(null);
  const cardButtonRef = useRef(null);
  const formDataRef = useRef({ amount, description, clientName });
  const paymentCompleteRef = useRef(false);

  const isFormValid = Boolean(
    clientName.trim() &&
      description.trim() &&
      amount &&
      Number.isFinite(Number(amount)) &&
      Number(amount) >= 1 &&
      Number(amount) <= 100000
  );

  useEffect(() => {
    formDataRef.current = { amount, description, clientName };
  }, [amount, clientName, description]);

  useEffect(() => {
    let cancelled = false;

    loadPayPalSdk()
      .then(() => {
        if (!cancelled) setPaypalSdkStatus('ready');
      })
      .catch((err) => {
        console.error('PayPal SDK load error:', err);
        if (!cancelled) {
          setPaypalSdkStatus('error');
          setPaymentStatus('error');
          setStatusMessage(err.message || 'PayPal is temporarily unavailable.');
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (paypalSdkStatus !== 'ready' || !isFormValid) return undefined;

    let cancelled = false;
    const buttonInstances = [];

    const handlePaymentError = (err) => {
      if (paymentCompleteRef.current) return;
      console.error('PayPal checkout error:', err);
      setPaymentStatus('error');
      setStatusMessage(
        err?.message ||
          'Payment could not be completed. Please try again or contact our office.'
      );
    };

    const buttonOptions = (fundingSource) => ({
      fundingSource,
      style: {
        layout: 'vertical',
        shape: 'pill',
        height: 52,
      },
      createOrder: async () => {
        paymentCompleteRef.current = false;
        return createPayPalOrder(formDataRef.current);
      },
      onApprove: async (data) => {
        setPaymentStatus('processing');
        setStatusMessage('Payment approved. Finalizing your transaction...');
        try {
          const capture = await capturePayPalOrder(data.orderID);
          paymentCompleteRef.current = true;
          setTransactionId(capture.id || data.orderID);
          setPaymentStatus('success');
          setStatusMessage(
            'Your payment has been successfully processed. Thank you!'
          );
        } catch (err) {
          handlePaymentError(err);
          throw err;
        }
      },
      onCancel: () => {
        setPaymentStatus('idle');
        setStatusMessage('Payment was cancelled. You can try again when ready.');
      },
      onError: handlePaymentError,
    });

    const renderButton = async (fundingSource, container, isCard = false) => {
      if (!container || cancelled) return;
      const buttons = window.paypal.Buttons(buttonOptions(fundingSource));
      buttonInstances.push(buttons);
      const eligible = buttons.isEligible();

      if (isCard) {
        setCardEligibilityChecked(true);
        setCardAvailable(eligible);
      }

      if (eligible) await buttons.render(container);
    };

    Promise.all([
      renderButton(window.paypal.FUNDING.PAYPAL, paypalButtonRef.current),
      renderButton(window.paypal.FUNDING.CARD, cardButtonRef.current, true),
    ]).catch(handlePaymentError);

    return () => {
      cancelled = true;
      buttonInstances.forEach((buttons) => buttons.close());
    };
  }, [isFormValid, paypalSdkStatus]);

  /** Reset for another payment. */
  const resetForm = () => {
    setAmount('');
    setClientName('');
    setDescription('');
    setPaymentStatus('idle');
    setStatusMessage('');
    setTransactionId('');
    paymentCompleteRef.current = false;
  };

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
            {/* ─── Payment Form ─── */}
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1E3A5F] to-[#722F37]"></div>

                {/* ── Success State ── */}
                {paymentStatus === 'success' ? (
                  <div className="text-center py-8 animate-enter">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 font-['Playfair_Display'] mb-4">
                      Payment Successful
                    </h2>
                    <p className="text-lg text-slate-600 mb-2">
                      {statusMessage}
                    </p>
                    {transactionId && (
                      <p className="text-sm text-slate-500 mb-8">
                        Transaction ID:{' '}
                        <span className="font-mono font-semibold text-slate-700">
                          {transactionId}
                        </span>
                      </p>
                    )}
                    <button
                      onClick={resetForm}
                      className="btn-premium inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#5B2C6F] text-white rounded-full font-bold shadow-xl"
                    >
                      Make Another Payment
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-2">
                      Make a Payment
                    </h2>
                    <p className="text-slate-600 mb-8">
                      Securely pay your invoice or retainer fee with PayPal or
                      a credit/debit card.
                    </p>

                    {/* Error Banner */}
                    {paymentStatus === 'error' && statusMessage && (
                      <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-xl animate-enter">
                        <AlertCircle
                          size={20}
                          className="text-red-500 flex-shrink-0 mt-0.5"
                        />
                        <p className="text-red-700 text-sm font-medium">
                          {statusMessage}
                        </p>
                      </div>
                    )}

                    {/* Cancelled Banner */}
                    {paymentStatus === 'idle' && statusMessage && (
                      <div className="flex items-start gap-3 p-4 mb-6 bg-amber-50 border border-amber-200 rounded-xl animate-enter">
                        <AlertCircle
                          size={20}
                          className="text-amber-500 flex-shrink-0 mt-0.5"
                        />
                        <p className="text-amber-700 text-sm font-medium">
                          {statusMessage}
                        </p>
                      </div>
                    )}

                    <div className="space-y-6">
                      {/* Name */}
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
                            maxLength={127}
                            required
                          />
                        </div>
                      </div>

                      {/* Description */}
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] outline-none transition-colors"
                            placeholder="Payment for services"
                            maxLength={127}
                            required
                          />
                        </div>
                      </div>

                      {/* Amount */}
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
                            max="100000"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E3A5F] focus:border-[#1E3A5F] outline-none transition-colors"
                            placeholder="0.00"
                            required
                          />
                        </div>
                      </div>

                      {/* PayPal Checkout */}
                      <div className="pt-4">
                        {isFormValid ? (
                          <div>
                            {paypalSdkStatus === 'loading' && (
                              <div className="w-full bg-slate-100 text-slate-600 font-semibold rounded-full py-4 flex items-center justify-center gap-3 border border-slate-200">
                                <Loader2 size={22} className="animate-spin" />
                                Loading secure payment options...
                              </div>
                            )}
                            <div ref={paypalButtonRef} className="min-h-[52px]" />
                            {cardAvailable && (
                              <div className="my-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                <span className="h-px flex-1 bg-slate-200" />
                                or
                                <span className="h-px flex-1 bg-slate-200" />
                              </div>
                            )}
                            <div
                              ref={cardButtonRef}
                              className={cardAvailable ? 'min-h-[52px]' : ''}
                            />
                            {cardEligibilityChecked && !cardAvailable && (
                              <p className="mt-3 text-center text-xs text-slate-500">
                                Card checkout is unavailable for this payment.
                                You can still use a card through PayPal checkout
                                when PayPal offers it.
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="w-full bg-slate-100 text-slate-400 font-bold rounded-full py-4 flex items-center justify-center gap-3 cursor-not-allowed border border-slate-200">
                            <DollarSign size={24} />
                            <span className="text-lg">
                              Fill in all fields to pay
                            </span>
                          </div>
                        )}
                        {paymentStatus === 'processing' && statusMessage && (
                          <p className="text-center text-sm text-slate-600 mt-3 flex items-center justify-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            {statusMessage}
                          </p>
                        )}
                        {paymentStatus === 'error' && (
                          <button
                            type="button"
                            onClick={() => {
                              if (paypalSdkStatus === 'error') {
                                window.location.reload();
                                return;
                              }
                              setPaymentStatus('idle');
                              setStatusMessage('');
                            }}
                            className="w-full mt-3 text-sm font-semibold text-[#1E3A5F] hover:text-[#722F37]"
                          >
                            Try payment again
                          </button>
                        )}
                        <p className="text-center text-xs text-slate-500 mt-4">
                          Your payment is processed securely through PayPal. We
                          never see your card details.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ─── Office Contact Info ─── */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F]/10 rounded-full mb-6 border border-[#1E3A5F]/30 w-fit">
                <span className="text-[#1E3A5F] font-bold text-sm tracking-wide uppercase">
                  Contact Info
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-['Playfair_Display'] mb-6">
                Need Assistance?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                If you have questions regarding your invoice or experience any
                issues submitting your payment, please contact our office.
              </p>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="space-y-6 text-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <PhoneCall size={20} className="text-[#1E3A5F]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Phone</p>
                      <a
                        href="tel:+12025482999"
                        className="text-slate-600 hover:text-[#722F37] transition-colors block mt-1"
                      >
                        (202) 548-2999
                      </a>
                      <a
                        href="tel:+12025488114"
                        className="text-slate-600 hover:text-[#722F37] transition-colors block mt-1"
                      >
                        (202) 548-8114
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-[#1E3A5F]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Email</p>
                      <a
                        href="mailto:lawfirm@pjoutlawlegal.com"
                        className="text-slate-600 hover:text-[#722F37] transition-colors block mt-1"
                      >
                        lawfirm@pjoutlawlegal.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-[#1E3A5F]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Office</p>
                      <p className="text-slate-600 mt-1">
                        412 H Street, NE
                        <br />
                        Washington, DC 20002
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Trust Badge */}
              <div className="mt-8 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle
                  size={20}
                  className="text-green-600 flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Secure Payment
                  </p>
                  <p className="text-xs text-green-700">
                    All transactions are encrypted and processed by PayPal. Your
                    financial information is never stored on our servers.
                  </p>
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
