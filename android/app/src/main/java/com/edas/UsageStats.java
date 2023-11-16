package com.edas;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class UsageStats extends ReactContextBaseJavaModule {
    UsageStats(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "UsageStats";
    }

    @ReactMethod
    public String sayHi() {
        return "hi";
    }
}