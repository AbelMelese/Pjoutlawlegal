import { useCallback, useEffect, useRef, useState } from 'react';
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
  CreditCard,
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
    .then(async ({ clientId, environment = 'production' }) => {
      if (!clientId) throw new Error('PayPal is not configured.');

      const sdkUrl =
        environment === 'sandbox'
          ? 'https://www.sandbox.paypal.com/web-sdk/v6/core'
          : 'https://www.paypal.com/web-sdk/v6/core';

      if (!window.paypal?.createInstance) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.id = 'paypal-js-sdk';
          script.src = sdkUrl;
          script.async = true;
          script.onload = () =>
            window.paypal?.createInstance
              ? resolve()
              : reject(new Error('PayPal checkout could not be initialized.'));
          script.onerror = () =>
            reject(new Error('PayPal checkout could not be loaded.'));
          document.head.appendChild(script);
        });
      }

      return window.paypal.createInstance({
        clientId,
        components: [
          'paypal-payments',
          'paypal-guest-payments',
          'card-fields',
        ],
        pageType: 'checkout',
        locale: 'en-US',
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
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle | processing | success | error
  const [statusMessage, setStatusMessage] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const [paypalSdkStatus, setPaypalSdkStatus] = useState('loading');
  const [cardEligibilityChecked, setCardEligibilityChecked] = useState(false);
  const [cardAvailable, setCardAvailable] = useState(true);
  const [cardMode, setCardMode] = useState('checking');
  const paypalSdkRef = useRef(null);
  const paypalButtonRef = useRef(null);
  const guestCardButtonRef = useRef(null);
  const cardNameRef = useRef(null);
  const cardNumberRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const cardCvvRef = useRef(null);
  const cardSessionRef = useRef(null);
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

  const handlePaymentError = useCallback((err) => {
    if (paymentCompleteRef.current) return;
    console.error('PayPal checkout error:', err);
    setPaymentStatus('error');
    setStatusMessage(
      err?.message ||
        'Payment could not be completed. Please try again or contact our office.'
    );
  }, []);

  const finishPayment = useCallback(
    async (orderId) => {
      setPaymentStatus('processing');
      setStatusMessage('Payment approved. Finalizing your transaction...');

      try {
        const capture = await capturePayPalOrder(orderId);
        paymentCompleteRef.current = true;
        setTransactionId(capture.id || orderId);
        setPaymentStatus('success');
        setStatusMessage(
          'Your payment has been successfully processed. Thank you!'
        );
      } catch (err) {
        handlePaymentError(err);
        throw err;
      }
    },
    [handlePaymentError]
  );

  useEffect(() => {
    let cancelled = false;

    loadPayPalSdk()
      .then((sdkInstance) => {
        if (!cancelled) {
          paypalSdkRef.current = sdkInstance;
          setPaypalSdkStatus('ready');
        }
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
    let paypalButton;
    let paypalClickHandler;
    let guestCardSession;
    let guestCardButton;
    let guestCardClickHandler;
    const mountedCardContainers = [];
    const paypalButtonContainer = paypalButtonRef.current;
    const guestCardButtonContainer = guestCardButtonRef.current;
    const cardContainers = [
      [cardNameRef.current, 'name', 'Name on card'],
      [cardNumberRef.current, 'number', 'Card number'],
      [cardExpiryRef.current, 'expiry', 'MM/YY'],
      [cardCvvRef.current, 'cvv', 'Security code'],
    ];

    const setupCheckout = async () => {
      const sdk = paypalSdkRef.current;
      if (!sdk) throw new Error('PayPal checkout is not ready.');

      const paymentMethods = await sdk.findEligibleMethods({
        currencyCode: 'USD',
      });
      if (cancelled) return;

      if (paymentMethods.isEligible('paypal') && paypalButtonContainer) {
        const paypalSession = sdk.createPayPalOneTimePaymentSession({
          onApprove: (data) => finishPayment(data.orderId),
          onCancel: () => {
            setPaymentStatus('idle');
            setStatusMessage(
              'Payment was cancelled. You can try again when ready.'
            );
          },
          onError: handlePaymentError,
        });

        paypalButton = document.createElement('paypal-button');
        paypalButton.setAttribute('type', 'pay');
        paypalButton.style.width = '100%';
        paypalClickHandler = async () => {
          paymentCompleteRef.current = false;
          try {
            const orderPromise = createPayPalOrder(formDataRef.current).then(
              (orderId) => ({ orderId })
            );
            await paypalSession.start(
              { presentationMode: 'auto', targetElement: paypalButton },
              orderPromise
            );
          } catch (err) {
            handlePaymentError(err);
          }
        };

        paypalButton.addEventListener('click', paypalClickHandler);
        paypalButtonContainer.replaceChildren(paypalButton);
      }

      const isCardEligible = paymentMethods.isEligible('advanced_cards');
      if (!isCardEligible) {
        const isGuestCardEligible =
          paymentMethods.isEligible('card') &&
          typeof sdk.createPayPalGuestOneTimePaymentSession === 'function';

        if (isGuestCardEligible && guestCardButtonContainer) {
          guestCardSession = sdk.createPayPalGuestOneTimePaymentSession({
            onApprove: (data) => finishPayment(data.orderId),
            onCancel: () => {
              setPaymentStatus('idle');
              setStatusMessage(
                'Payment was cancelled. You can try again when ready.'
              );
            },
            onError: handlePaymentError,
          });

          const guestCardWrapper = document.createElement(
            'paypal-basic-card-container'
          );
          guestCardButton = document.createElement(
            'paypal-basic-card-button'
          );
          guestCardClickHandler = async () => {
            paymentCompleteRef.current = false;
            try {
              const orderPromise = createPayPalOrder(
                formDataRef.current
              ).then((orderId) => ({ orderId }));
              await guestCardSession.start(
                {
                  presentationMode: 'auto',
                  targetElement: guestCardButton,
                },
                orderPromise
              );
            } catch (err) {
              handlePaymentError(err);
            }
          };

          guestCardButton.addEventListener('click', guestCardClickHandler);
          guestCardWrapper.appendChild(guestCardButton);
          guestCardButtonContainer.replaceChildren(guestCardWrapper);
          setCardMode('guest');
          setCardAvailable(true);
        } else {
          setCardMode('unavailable');
          setCardAvailable(false);
        }
        setCardEligibilityChecked(true);
        return;
      }

      if (cardContainers.some(([container]) => !container)) return;

      const cardSession = sdk.createCardFieldsOneTimePaymentSession();
      const fieldStyle = {
        input: {
          color: '#0f172a',
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          lineHeight: '24px',
          padding: '11px 14px',
        },
        '.invalid': { color: '#b91c1c' },
      };

      cardContainers.forEach(([container, type, placeholder]) => {
        const field = cardSession.createCardFieldsComponent({
          type,
          placeholder,
          style: fieldStyle,
        });
        container.replaceChildren(field);
        mountedCardContainers.push(container);
      });

      cardSessionRef.current = cardSession;
      setCardMode('advanced');
      setCardAvailable(true);
      setCardEligibilityChecked(true);
    };

    setupCheckout().catch(handlePaymentError);

    return () => {
      cancelled = true;
      if (paypalButton && paypalClickHandler) {
        paypalButton.removeEventListener('click', paypalClickHandler);
      }
      if (paypalButtonContainer) paypalButtonContainer.replaceChildren();
      if (guestCardButton && guestCardClickHandler) {
        guestCardButton.removeEventListener('click', guestCardClickHandler);
      }
      guestCardSession?.destroy();
      if (guestCardButtonContainer) {
        guestCardButtonContainer.replaceChildren();
      }
      mountedCardContainers.forEach((container) => container.replaceChildren());
      cardSessionRef.current = null;
    };
  }, [
    finishPayment,
    handlePaymentError,
    isFormValid,
    paypalSdkStatus,
  ]);

  const submitCardPayment = async () => {
    if (
      !cardSessionRef.current ||
      !billingPostalCode.trim() ||
      paymentStatus === 'processing'
    ) {
      return;
    }

    paymentCompleteRef.current = false;
    setPaymentStatus('processing');
    setStatusMessage('Securely verifying your card...');

    try {
      const orderId = await createPayPalOrder(formDataRef.current);
      const result = await cardSessionRef.current.submit(orderId, {
        billingAddress: { postalCode: billingPostalCode.trim() },
      });

      if (result.state === 'succeeded') {
        await finishPayment(result.data.orderId || orderId);
        return;
      }

      if (result.state === 'canceled') {
        setPaymentStatus('idle');
        setStatusMessage(
          'Card verification was cancelled. You can try again when ready.'
        );
        return;
      }

      throw new Error(
        result.data?.message ||
          'The card could not be verified. Check the details and try again.'
      );
    } catch (err) {
      handlePaymentError(err);
    }
  };

  /** Reset for another payment. */
  const resetForm = () => {
    setAmount('');
    setClientName('');
    setDescription('');
    setBillingPostalCode('');
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
                            {paypalSdkStatus === 'ready' && cardAvailable && (
                              <div className="my-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                <span className="h-px flex-1 bg-slate-200" />
                                or pay by card
                                <span className="h-px flex-1 bg-slate-200" />
                              </div>
                            )}
                            <div
                              ref={guestCardButtonRef}
                              className={
                                paypalSdkStatus === 'ready' &&
                                cardMode === 'guest'
                                  ? 'min-h-[52px]'
                                  : 'hidden'
                              }
                            />
                            {paypalSdkStatus === 'ready' && cardAvailable && (
                              <div
                                className={
                                  cardMode === 'advanced'
                                    ? 'rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5'
                                    : 'hidden'
                                }
                              >
                                <div className="space-y-3">
                                  <div
                                    ref={cardNameRef}
                                    className="h-12 overflow-hidden rounded-xl border border-slate-300 bg-white"
                                  />
                                  <div
                                    ref={cardNumberRef}
                                    className="h-12 overflow-hidden rounded-xl border border-slate-300 bg-white"
                                  />
                                  <div className="grid grid-cols-2 gap-3">
                                    <div
                                      ref={cardExpiryRef}
                                      className="h-12 overflow-hidden rounded-xl border border-slate-300 bg-white"
                                    />
                                    <div
                                      ref={cardCvvRef}
                                      className="h-12 overflow-hidden rounded-xl border border-slate-300 bg-white"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    value={billingPostalCode}
                                    onChange={(event) =>
                                      setBillingPostalCode(event.target.value)
                                    }
                                    autoComplete="postal-code"
                                    inputMode="text"
                                    maxLength={12}
                                    placeholder="Billing ZIP / postal code"
                                    aria-label="Billing ZIP or postal code"
                                    className="block h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition-colors focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={submitCardPayment}
                                  disabled={
                                    !billingPostalCode.trim() ||
                                    paymentStatus === 'processing'
                                  }
                                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1E3A5F] px-5 py-3.5 font-bold text-white shadow-md transition-colors hover:bg-[#162f4d] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                                >
                                  {paymentStatus === 'processing' ? (
                                    <Loader2 size={20} className="animate-spin" />
                                  ) : (
                                    <CreditCard size={20} />
                                  )}
                                  Pay securely by card
                                </button>
                              </div>
                            )}
                            {cardEligibilityChecked && !cardAvailable && (
                              <p className="mt-3 text-center text-xs text-slate-500">
                                Direct card checkout is unavailable for this
                                payment. Please use the PayPal option above.
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
