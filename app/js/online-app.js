/**
 * Cafe Coffee Delite - Online Delivery Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
    // --- QR Code Redirect ---
    // If a customer scans an old QR code (/?table=11), instantly redirect them to the Dining App
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('table')) {
        window.location.href = '/table.html' + window.location.search;
        return; // Stop execution
    }

    // --- Password Login/Register Logic ---
    const loginOverlay = document.getElementById('customerLoginOverlay');
    const loginError = document.getElementById('customerLoginError');
    
    // Views
    const viewLogin = document.getElementById('authLoginView');
    const viewRegister = document.getElementById('authRegisterView');
    const viewOtp = document.getElementById('authOtpView');

    // Forms
    const loginForm = document.getElementById('customerLoginForm');
    const registerForm = document.getElementById('customerRegisterForm');
    const otpForm = document.getElementById('customerOtpForm');

    // Toggles
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const backToLoginBtn = document.getElementById('customerBackToLoginBtn');

    let registeringEmail = '';

    if (loginOverlay && window.sb) {
        // Check session
        const { data: { session } } = await window.sb.auth.getSession();
        if (session) {
            loginOverlay.style.display = 'none';
        } else {
            loginOverlay.style.display = 'flex';
        }

        // View Toggling
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', () => {
                loginError.classList.add('is-hidden');
                viewLogin.style.display = 'none';
                viewRegister.style.display = 'block';
            });
        }
        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', () => {
                loginError.classList.add('is-hidden');
                viewRegister.style.display = 'none';
                viewLogin.style.display = 'block';
            });
        }
        if (backToLoginBtn) {
            backToLoginBtn.addEventListener('click', () => {
                loginError.classList.add('is-hidden');
                viewOtp.style.display = 'none';
                viewLogin.style.display = 'block';
            });
        }

        // 1. LOGIN
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmailInput').value.trim();
                const password = document.getElementById('loginPasswordInput').value;
                if (!email || !password) return;
                
                const btn = document.getElementById('customerLoginBtn');
                btn.innerHTML = 'Logging in...';
                btn.disabled = true;
                loginError.classList.add('is-hidden');

                const { error, data } = await window.sb.auth.signInWithPassword({ email, password });
                
                btn.innerHTML = 'Login';
                btn.disabled = false;

                if (error) {
                    loginError.textContent = error.message;
                    loginError.classList.remove('is-hidden');
                } else if (data.session) {
                    loginOverlay.style.display = 'none';
                }
            });
        }

        // 2. REGISTER
        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('registerEmailInput').value.trim();
                const password = document.getElementById('registerPasswordInput').value;
                if (!email || !password) return;

                const btn = document.getElementById('customerRegisterBtn');
                btn.innerHTML = 'Creating...';
                btn.disabled = true;
                loginError.classList.add('is-hidden');

                const { error, data } = await window.sb.auth.signUp({ email, password });
                
                btn.innerHTML = 'Create Account';
                btn.disabled = false;

                if (error) {
                    loginError.textContent = error.message;
                    loginError.classList.remove('is-hidden');
                } else {
                    // Check if auto-logged in (email confirmation disabled)
                    if (data.session) {
                        loginOverlay.style.display = 'none';
                    } else {
                        // Email confirmation is required
                        registeringEmail = email;
                        viewRegister.style.display = 'none';
                        viewOtp.style.display = 'block';
                    }
                }
            });
        }

        // 3. VERIFY OTP (During Signup)
        if (otpForm) {
            otpForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const otp = document.getElementById('customerOtpInput').value.trim();
                if (!otp) return;

                const btn = document.getElementById('customerVerifyCodeBtn');
                btn.innerHTML = 'Verifying...';
                btn.disabled = true;
                loginError.classList.add('is-hidden');

                const { data, error } = await window.sb.auth.verifyOtp({
                    email: registeringEmail,
                    token: otp,
                    type: 'signup'
                });

                btn.innerHTML = 'Verify Account';
                btn.disabled = false;

                if (error) {
                    loginError.textContent = error.message;
                    loginError.classList.remove('is-hidden');
                } else if (data.session) {
                    loginOverlay.style.display = 'none';
                }
            });
        }
    }

    // 1. Override the checkout button
    const placeBtn = document.getElementById('placeOrderBtn');
    if (!placeBtn) return;
    
    const newPlaceBtn = placeBtn.cloneNode(true);
    placeBtn.parentNode.replaceChild(newPlaceBtn, placeBtn);

    // 2. Setup Geolocation
    const getLocationBtn = document.getElementById('getLocationBtn');
    const addressInput = document.getElementById('checkoutAddress');
    const latInput = document.getElementById('checkoutLat');
    const lngInput = document.getElementById('checkoutLng');

    // Initialize Google Places Autocomplete if available
    if (window.google && window.google.maps && window.google.maps.places) {
        const autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
            fields: ["formatted_address", "geometry", "name"],
        });
        
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
                latInput.value = place.geometry.location.lat();
                lngInput.value = place.geometry.location.lng();
                addressInput.value = place.formatted_address || place.name;
            }
        });
        
        // Prevent form submission on Enter key in address field
        addressInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') e.preventDefault();
        });
    }

    getLocationBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            showToast('Geolocation is not supported by your browser', true);
            return;
        }
        
        getLocationBtn.innerHTML = '⏳ Locating...';
        getLocationBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                latInput.value = lat;
                lngInput.value = lng;
                
                // Use Google Geocoder if available, else fallback to Nominatim
                if (window.google && window.google.maps && window.google.maps.Geocoder) {
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                        if (status === "OK" && results[0]) {
                            addressInput.value = results[0].formatted_address;
                        } else {
                            addressInput.value = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                        }
                    });
                } else {
                    // Fallback to Nominatim
                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                        const data = await res.json();
                        if (data && data.display_name) {
                            addressInput.value = data.display_name;
                        } else {
                            addressInput.value = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                        }
                    } catch (e) {
                        addressInput.value = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                    }
                }
                
                getLocationBtn.innerHTML = '✅ Location Found';
                getLocationBtn.style.color = '#22c55e';
                getLocationBtn.style.borderColor = '#22c55e';
            },
            (error) => {
                showToast('Unable to retrieve your location', true);
                getLocationBtn.innerHTML = '📍 Use Current Location';
                getLocationBtn.disabled = false;
            },
            { enableHighAccuracy: true }
        );
    });

    // 3. Setup UPI QR Code
    // We need to fetch the UPI ID from config
    let upiId = '';
    if (window.sbGetConfig) {
        const conf = await window.sbGetConfig();
        if (conf && conf.upi_id) {
            upiId = conf.upi_id;
        }
    }
    
    if (!upiId) {
        // Fallback or hide
        document.getElementById('upiQrCode').style.display = 'none';
    }

    // When cart opens, update QR Code
    const proceedCheckoutBtn = document.getElementById('proceedCheckout');
    proceedCheckoutBtn.addEventListener('click', () => {
        if (!upiId || cart.length === 0) return;
        
        let sub = 0;
        cart.forEach(i => { sub += i.price * i.qty; });
        let total = sub;
        if (CONFIG.gstEnabled) {
            total = sub + Math.round(sub * CONFIG.gstRate);
        }
        
        const upiUrl = `upi://pay?pa=${upiId}&pn=Cafe%20Coffee%20Delite&am=${total}&cu=INR`;
        const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(upiUrl)}`;
        
        const qrImg = document.getElementById('upiQrCode');
        qrImg.src = qrApi;
        qrImg.style.display = 'block';
    });

    // 4. Override place order logic
    let _isPlacingOrder = false;

    newPlaceBtn.addEventListener('click', async () => {
        if (_isPlacingOrder) return;
        _isPlacingOrder = true;

        newPlaceBtn.disabled = true;
        newPlaceBtn.textContent = '⏳ Sending Order...';

        const address = addressInput.value.trim();
        const landmark = document.getElementById('checkoutLandmark').value.trim();
        const name = document.getElementById('checkoutName').value.trim();
        const phone = document.getElementById('checkoutPhone').value.trim();
        const utr = document.getElementById('checkoutUtr').value.trim();
        const notes = document.getElementById('checkoutNotes').value.trim();
        
        const lat = latInput.value || null;
        const lng = lngInput.value || null;

        if (!address || !name || !phone) {
            showToast('⚠️ Please fill required fields (Address, Name, Phone)', true);
            _isPlacingOrder = false;
            newPlaceBtn.disabled = false;
            newPlaceBtn.textContent = '🚀 Confirm & Send Order to Kitchen';
            return;
        }

        // Upload payment proof if provided
        let proofUrl = null;
        const proofFile = document.getElementById('checkoutProof').files[0];
        if (proofFile && window.sb) {
            try {
                // Upload to supabase storage bucket 'receipts'
                const fileExt = proofFile.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const { data, error } = await sb.storage.from('payment_proofs').upload(fileName, proofFile);
                if (error) throw error;
                
                const { data: { publicUrl } } = sb.storage.from('payment_proofs').getPublicUrl(fileName);
                proofUrl = publicUrl;
            } catch(e) {
                console.error('Proof upload error:', e);
                showToast('Failed to upload payment proof', true);
            }
        }

        // Calculate totals
        let sub = 0;
        const itemsList = cart.map(i => {
            sub += i.price * i.qty;
            return { name: i.name, qty: i.qty, price: i.price };
        });
        const gstAmt = CONFIG.gstEnabled ? Math.round(sub * CONFIG.gstRate) : 0;
        const total = sub + gstAmt;

        try {
            if (window.sb) {
                await window.sbSaveOrder({
                    order_type: 'online',
                    tableNumber: 'Online',
                    customerName: name,
                    customerPhone: phone,
                    address: address,
                    landmark: landmark,
                    latitude: lat ? parseFloat(lat) : null,
                    longitude: lng ? parseFloat(lng) : null,
                    utr_number: utr || null,
                    payment_proof_url: proofUrl,
                    items: itemsList,
                    subtotal: sub,
                    gst: gstAmt,
                    total: total,
                    notes: notes || null
                });
            }
        } catch (e) {
            console.error('[SB] Failed to save order:', e);
        }

        // Update Success Screen
        const successBadge = document.getElementById('successTableBadge');
        if (successBadge) successBadge.textContent = 'Delivery Order';
        
        const successItems = document.getElementById('successOrderItems');
        if (successItems) {
            const itemsHtml = itemsList.map(i => `<div>${i.qty}× ${esc(i.name)} — ₹${i.price * i.qty}</div>`).join('');
            successItems.innerHTML = itemsHtml + `<div style="font-weight:800; color:var(--text); margin-top:6px; padding-top:6px; border-top:1px dashed var(--border);">Total: ₹${total}</div>`;
        }

        newPlaceBtn.disabled = false;
        newPlaceBtn.textContent = '🚀 Confirm & Send Order to Kitchen';

        cart = [];
        if(window.updateCartUI) updateCartUI();

        if(window.closeScreens) closeScreens();
        
        const successScreen = document.getElementById('screenSuccess');
        if (successScreen) {
            successScreen.classList.add('open');
            successScreen.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        showToast('🎉 Order sent!');
        if(window.launchConfetti) launchConfetti();
        if(window.startOrderTracking) startOrderTracking();

        setTimeout(() => { _isPlacingOrder = false; }, 2000);
    });
});
