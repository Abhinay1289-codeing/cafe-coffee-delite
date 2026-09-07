package com.cafecoffeedelite.orders;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import com.getcapacitor.BridgeActivity;
import com.google.firebase.messaging.FirebaseMessaging;
import android.content.pm.PackageManager;
import androidx.core.content.ContextCompat;
import androidx.core.app.ActivityCompat;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class MainActivity extends BridgeActivity {
    private static final String SUPA_URL = "https://luhwhzsyjsiwdmwrohwc.supabase.co/rest/v1/admin_devices";
    private static final String SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1aHdoenN5anNpd2Rtd3JvaHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MTE5NTUsImV4cCI6MjEwMzM4Nzk1NX0.ZtNOL4PAvdY8udDYki3vTjuCw4jb8UdeZ4_abOMaWT0";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Request "Display over other apps" permission automatically
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + getPackageName()));
                startActivityForResult(intent, 1000);
            }
        }

        // Request Android 14 Full Screen Intent permission
        if (Build.VERSION.SDK_INT >= 34) { // 34 is UPSIDE_DOWN_CAKE (Android 14)
            android.app.NotificationManager notificationManager = getSystemService(android.app.NotificationManager.class);
            if (notificationManager != null && !notificationManager.canUseFullScreenIntent()) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_APP_USE_FULL_SCREEN_INTENT);
                intent.setData(Uri.parse("package:" + getPackageName()));
                startActivity(intent);
            }
        }

        // Request Android 13+ Notification Permission
        if (Build.VERSION.SDK_INT >= 33) { // TIRAMISU
            if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.POST_NOTIFICATIONS}, 101);
            }
        }

        // Fetch FCM token natively and send to Supabase DIRECTLY via Java HTTP
        FirebaseMessaging.getInstance().getToken().addOnCompleteListener(task -> {
            if (!task.isSuccessful()) {
                Log.w("MainActivity", "Fetching FCM registration token failed", task.getException());
                return;
            }
            String token = task.getResult();
            Log.d("MainActivity", "Native FCM Token: " + token);
            
            new Thread(() -> {
                try {
                    URL url = new URL(SUPA_URL);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("POST");
                    conn.setRequestProperty("Content-Type", "application/json");
                    conn.setRequestProperty("apikey", SUPA_KEY);
                    conn.setRequestProperty("Authorization", "Bearer " + SUPA_KEY);
                    conn.setRequestProperty("Prefer", "resolution=merge-duplicates");
                    conn.setDoOutput(true);

                    // We need to use upsert payload
                    String jsonInputString = "{\"fcm_token\": \"" + token + "\"}";
                    
                    try (OutputStream os = conn.getOutputStream()) {
                        byte[] input = jsonInputString.getBytes("utf-8");
                        os.write(input, 0, input.length);
                    }
                    
                    int code = conn.getResponseCode();
                    Log.d("MainActivity", "Supabase Token Sync Response Code: " + code);
                } catch (Exception e) {
                    Log.e("MainActivity", "Error syncing token to Supabase", e);
                }
            }).start();
        });
    }
}
