/**
 * Cafe Coffee Delite - Online Delivery Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
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
                
                // Reverse geocoding using Nominatim (OpenStreetMap)
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
