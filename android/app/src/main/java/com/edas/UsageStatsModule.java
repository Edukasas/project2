package com.edas;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.app.usage.UsageEvents;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;

import java.text.SimpleDateFormat;

import android.util.Log;
import java.util.Map;
import java.util.HashMap;
import java.util.Calendar;
import java.util.List;
import java.util.ArrayList;

public class UsageStatsModule extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public UsageStatsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "UsageStatsModule";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    // TODO: Add any necessary constants to the module here
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  private static final SimpleDateFormat dateFormat = new SimpleDateFormat("M-d-yyyy HH:mm:ss");
  public static final String TAG = UsageStatsModule.class.getSimpleName();
  // @SuppressWarnings("ResourceType")
  // public static void getStats(Context context){
  //   UsageStatsManager usm = (UsageStatsManager) context.getSystemService("usagestats");
  //   int interval = UsageStatsManager.INTERVAL_YEARLY;
  //   Calendar calendar = Calendar.getInstance();
  //   long endTime = calendar.getTimeInMillis();
  //   calendar.add(Calendar.YEAR, -1);
  //   long startTime = calendar.getTimeInMillis();
  //
  //   Log.d(TAG, "Range start:" + dateFormat.format(startTime) );
  //   Log.d(TAG, "Range end:" + dateFormat.format(endTime));
  //
  //   UsageEvents uEvents = usm.queryEvents(startTime,endTime);
  //   while (uEvents.hasNextEvent()){
  //     UsageEvents.Event e = new UsageEvents.Event();
  //     uEvents.getNextEvent(e);
  //
  //     if (e != null){
  //       Log.d(TAG, "Event: " + e.getPackageName() + "\t" +  e.getTimeStamp());
  //     }
  //   }
  // }

  public static List getDates(int durationInDays){
    List dates = getDateRangeFromNow(Calendar.DATE, -(durationInDays));

    return dates;
  }

  public static List getDateRangeFromNow(int field, int amount){
  // public static List getDateRangeFromNow(int field, int amount){
    List dates = new ArrayList();
    Calendar calendar = Calendar.getInstance();
    calendar.add(Calendar.DATE, 2);
    long endTime = calendar.getTimeInMillis();
    Calendar calendar2 = Calendar.getInstance();
    calendar2.add(field, amount);
    long startTime = calendar2.getTimeInMillis();


    // TESTING 1 2 3...
    // SimpleDateFormat formatOne = new SimpleDateFormat("yyyy-MM-dd");
    // String dateOne = formatOne.format(startTime);
    // String dateTwo = formatOne.format(endTime);
    // Toast.makeText(getReactApplicationContext(), dateOne, Toast.LENGTH_SHORT).show();
    // Toast.makeText(getReactApplicationContext(), dateTwo, Toast.LENGTH_SHORT).show();

    dates.add(startTime);
    dates.add(endTime);

    return dates;
  }

  public static List<UsageStats> getUsageStatsList(Context context){
    UsageStatsManager usm = (UsageStatsManager) context.getSystemService("usagestats");
    Calendar calendar = Calendar.getInstance();
    long endTime = calendar.getTimeInMillis();
    calendar.add(Calendar.YEAR, -1);
    long startTime = calendar.getTimeInMillis();
  
    Log.d(TAG, "Range start:" + dateFormat.format(startTime) );
    Log.d(TAG, "Range end:" + dateFormat.format(endTime));
  
    List<UsageStats> usageStatsList = usm.queryUsageStats(UsageStatsManager.INTERVAL_DAILY,startTime,endTime);
    return usageStatsList;
  }

  public static Map<String, Long> getAggregateStatsMap(Context context, int durationInDays){
Map<String , Long> usageTimeOfApps = new HashMap<>();// return variable containing the usage time of our interested apps
    Calendar calendar = Calendar.getInstance();
    long endTime = System.currentTimeMillis();
    calendar.set(Calendar.HOUR_OF_DAY,0);
    calendar.set(Calendar.MINUTE, 0);
    calendar.set(Calendar.SECOND, 0);
    calendar.set(Calendar.MILLISECOND,0);
    long startTime = calendar.getTimeInMillis();

    Map<String , Long> prev = new HashMap<>();
    UsageStatsManager usm = (UsageStatsManager) context.getSystemService("usagestats");
    UsageEvents usageEvents = usm.queryEvents(startTime, endTime);

    while (usageEvents.hasNextEvent()) {
        UsageEvents.Event event = new UsageEvents.Event();
        usageEvents.getNextEvent(event);
        String currPackageName=event.getPackageName();
            if (event.getEventType() == 1) {
                prev.put(currPackageName, event.getTimeStamp());
            } else if (event.getEventType() == 2 && prev.containsKey(currPackageName) && prev.get(currPackageName) != -1) {
              Long time;
                if (usageTimeOfApps.containsKey(currPackageName)) {
                  time = usageTimeOfApps.get(currPackageName) + (event.getTimeStamp() - prev.get(currPackageName));
                  usageTimeOfApps.put(currPackageName, time);  
                } else {
                  time = (event.getTimeStamp() - prev.get(currPackageName));
                  usageTimeOfApps.put(currPackageName, time);
                }
            }
    }

    return usageTimeOfApps;
  }

  // See here for more help:
  // https://github.com/ColeMurray/UsageStatsSample/blob/master/app/src/main/java/com/murraycole/appusagesample/UStats.java
  // public static String printUsageStats(List<UsageStats> usageStatsList){
  //   String statsString = new String();
  //   statsString = statsString + "hello";
  //   for (UsageStats u : usageStatsList){
  //     // statsString = statsString + "Pkg: " + u.getPackageName() +  "\t" + "ForegroundTime: "
  //     //   + u.getTotalTimeInForeground() + "\n";
  //     statsString = statsString + "!";
  //   }
  //   return statsString;
  // }

  // public static void printCurrentUsageStatus(Context context){
  //   printUsageStats(getUsageStatsList(context));
  // }
  // @SuppressWarnings("ResourceType")
  // private static UsageStatsManager getUsageStatsManager(Context context){
  //   UsageStatsManager usm = (UsageStatsManager) context.getSystemService("usagestats");
  //   return usm;
  // }

  public static String getStatsString(Map<String, Long> aggregateStats){
    List appsCollection = new ArrayList();

    for(Map.Entry<String, Long> entry: aggregateStats.entrySet()) {
        String temp = entry.getKey() + ":" + entry.getValue();
        appsCollection.add(temp);
    }

    String apps = joinStringList(",", appsCollection);;

    return apps;
  }

  public static String joinStringList(String joiner, List items){
    String joined = new String();

    for(int i = 0; i < items.size(); i++) {
      joined += items.get(i);
      if(i < items.size() - 1){
        joined += joiner;
      }
    }

    return joined;
  }

  @ReactMethod
  public void getStats(
    int durationInDays,
    Callback successCallback,
    Callback errorCallback) {
      if (durationInDays > 0) {
        try {
          String stats = getStatsString(getAggregateStatsMap(getReactApplicationContext(), durationInDays));

          // List dates = getDates(durationInDays);

          successCallback.invoke(stats);
        } catch (Exception e) {
          String errorMessage = e.getMessage();
          errorCallback.invoke(errorMessage);
          Toast.makeText(getReactApplicationContext(), errorMessage, Toast.LENGTH_LONG).show();
        }
      } else {
        String noticeMessage = "Enter an integer greater than 0!";
        Toast.makeText(getReactApplicationContext(), noticeMessage, Toast.LENGTH_SHORT).show();
      }
    }

  @ReactMethod
  public void testToast(
    int duration) {
      String test = "It works!";
      Toast.makeText(getReactApplicationContext(), test, duration).show();
    }
}