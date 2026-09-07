package com.cafecoffeedelite.orders;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import androidx.core.app.NotificationManagerCompat;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class OrderActionReceiver extends BroadcastReceiver {
    private static final String TAG = "OrderActionReceiver";
    private static final String SUPA_REST_URL = "https://luhwhzsyjsiwdmwrohwc.supabase.co/rest/v1/orders";
    private static final String SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1aHdoenN5anNpd2Rtd3JvaHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MTE5NTUsImV4cCI6MjEwMzM4Nzk1NX0.ZtNOL4PAvdY8udDYki3vTjuCw4jb8UdeZ4_abOMaWT0";

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent == null) return;
        String action = intent.getAction();
        String orderId = intent.getStringExtra("orderId");

        // Cancel notification alert
        try {
            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
            notificationManager.cancel(1001);
        } catch (Exception e) {
            Log.e(TAG, "Error cancelling notification", e);
        }

        if (orderId == null || orderId.trim().isEmpty()) return;

        String targetStatus = null;
        if ("com.cafecoffeedelite.orders.ACTION_ACCEPT".equals(action)) {
            targetStatus = "preparing";
        } else if ("com.cafecoffeedelite.orders.ACTION_DECLINE".equals(action)) {
            targetStatus = "cancelled";
        }

        if (targetStatus != null) {
            final String statusToSet = targetStatus;
            new Thread(() -> {
                try {
                    URL url = new URL(SUPA_REST_URL + "?id=eq." + orderId);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("PATCH");
                    conn.setRequestProperty("Content-Type", "application/json");
                    conn.setRequestProperty("apikey", SUPA_KEY);
                    conn.setRequestProperty("Authorization", "Bearer " + SUPA_KEY);
                    conn.setDoOutput(true);

                    String payload = "{\"status\": \"" + statusToSet + "\"}";
                    try (OutputStream os = conn.getOutputStream()) {
                        byte[] input = payload.getBytes("utf-8");
                        os.write(input, 0, input.length);
                    }

                    int code = conn.getResponseCode();
                    Log.d(TAG, "Direct notification action: Order " + orderId + " set to " + statusToSet + ", Response Code: " + code);
                } catch (Exception e) {
                    Log.e(TAG, "Error updating order status from notification action", e);
                }
            }).start();
        }
    }
}
