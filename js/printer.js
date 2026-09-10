/**
 * Cafe Coffee Delite - Printer Utility
 * Handles ESC/POS formatting and TCP socket communication with the receipt printer.
 */

class ReceiptPrinter {
    constructor() {
        this.buffer = [];
        this.ipAddress = localStorage.getItem('printerIp') || '';
        this.port = 9100;
        
        // Ensure capacitor plugin is available
        this.TcpSocket = window.Capacitor?.Plugins?.TcpSocket;
    }

    // --- ESC/POS COMMANDS ---
    
    init() {
        this.buffer.push(0x1B, 0x40); // ESC @
    }

    alignCenter() {
        this.buffer.push(0x1B, 0x61, 1);
    }

    alignLeft() {
        this.buffer.push(0x1B, 0x61, 0);
    }

    alignRight() {
        this.buffer.push(0x1B, 0x61, 2);
    }

    setBold(enabled) {
        this.buffer.push(0x1B, 0x45, enabled ? 1 : 0);
    }

    setTextSize(width, height) {
        // Size ranges from 0-7
        const size = (width << 4) | height;
        this.buffer.push(0x1D, 0x21, size);
    }
    
    feed(lines = 1) {
        this.buffer.push(0x1B, 0x64, lines);
    }

    cut() {
        this.buffer.push(0x1D, 0x56, 0x41, 0x00); // Full cut
    }

    text(str) {
        for (let i = 0; i < str.length; i++) {
            this.buffer.push(str.charCodeAt(i));
        }
    }

    textLine(str) {
        this.text(str);
        this.buffer.push(0x0A); // LF
    }
    
    separator() {
        this.textLine("-".repeat(48)); // 80mm printer usually fits 48 standard chars
    }

    // --- FORMATTING HELPERS ---

    buildBillReceipt(order) {
        this.buffer = [];
        this.init();
        
        // Header
        this.alignCenter();
        this.setTextSize(1, 1);
        this.setBold(true);
        this.textLine("CAFE COFFEE DELITE");
        this.setTextSize(0, 0);
        this.setBold(false);
        this.textLine("123 Coffee Street, Cafe City");
        this.textLine("Phone: +1 234 567 8900");
        this.separator();
        
        // Order Info
        this.alignLeft();
        this.textLine(`Order ID: ${order.id.slice(0, 8).toUpperCase()}`);
        this.textLine(`Date: ${new Date(order.created_at).toLocaleString()}`);
        if (order.order_type === 'online') {
            this.textLine(`Type: ONLINE DELIVERY`);
            this.textLine(`Customer: ${order.customer_name || 'Guest'}`);
            this.textLine(`Phone: ${order.customer_phone || ''}`);
        } else {
            this.textLine(`Type: DINE-IN`);
            this.textLine(`Table: ${order.table_number || ''}`);
        }
        this.separator();
        
        // Items
        this.setBold(true);
        this.textLine("ITEM                           QTY    PRICE");
        this.setBold(false);
        this.separator();
        
        const items = order.items || [];
        items.forEach(item => {
            const nameStr = (item.name || '').substring(0, 26).padEnd(28, ' ');
            const qtyStr = (item.quantity || 1).toString().padEnd(4, ' ');
            const priceStr = (item.price * (item.quantity || 1)).toString().padStart(8, ' ');
            this.textLine(`${nameStr} ${qtyStr} ${priceStr}`);
        });
        
        this.separator();
        
        // Totals
        this.alignRight();
        this.textLine(`Subtotal: Rs. ${order.subtotal || 0}`);
        this.textLine(`GST (5%): Rs. ${order.gst || 0}`);
        this.setTextSize(0, 1);
        this.setBold(true);
        this.textLine(`TOTAL: Rs. ${order.total || 0}`);
        this.setTextSize(0, 0);
        this.setBold(false);
        
        this.feed(2);
        this.alignCenter();
        this.textLine("Thank You! Visit Again.");
        this.feed(4);
        
        this.cut();
        
        return this.buffer;
    }

    // --- COMMUNICATION ---

    bytesToHex(bytesArray) {
        return bytesArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async printOrder(order) {
        this.ipAddress = localStorage.getItem('printerIp') || '';
        
        if (!this.ipAddress) {
            console.warn('Printer IP not configured.');
            return false;
        }

        if (!this.TcpSocket) {
            console.warn('TCP Socket plugin not available. (Are you running in browser?)');
            return false;
        }

        try {
            const bytes = this.buildBillReceipt(order);
            const hexData = this.bytesToHex(bytes);

            console.log(`Connecting to printer at ${this.ipAddress}:${this.port}...`);
            const conn = await this.TcpSocket.connect({
                ipAddress: this.ipAddress,
                port: this.port
            });

            console.log(`Connected (Client ID: ${conn.client}). Sending data...`);
            await this.TcpSocket.send({
                client: conn.client,
                data: hexData,
                encoding: 'hex' // Based on the capacitor-tcp-socket docs
            });

            console.log('Data sent. Disconnecting...');
            await this.TcpSocket.disconnect({ client: conn.client });
            
            return true;
        } catch (error) {
            console.error('Printer error:', error);
            return false;
        }
    }
}

// Global instance
window.printer = new ReceiptPrinter();
