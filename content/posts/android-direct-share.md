---
title: Implementing Android's Direct Share
layout: Post
date: 2017-06-18T12:10
---

# Table of Contents

# How to:

Android Nougat's Direct Share feature allows app developers to give a list of share targets that show at the top of the share dialog. These options reduce the number of taps required to share the information the user wants to send. Instead of `Share > Select App > Select target`, the user can go `Share > Select target`.

In my weekend experiment ([Mars](/projects/mars/)), I wanted to send URLs to devices without having to bring up a dialog to select the device. Direct Share is the way to do it.

Overall, implementing Direct Share is easy. Create a Service that extends `ChooserTargetService`, implement `onGetChooserTargets`, add it to your Manifest, handle it incoming, and away you go.

## ChooserTargetService

### Java

ChooserTargetService does most of the heavy lifting for you. The system will start it whenever the user starts to share something, and all you need to do is provide a list of targets.

```java
// MyChooserService.java
public class MyChooserService extends ChooserTargetService {
    @Override
    public List<ChooserTarget> onGetChooserTargets(ComponentName componentName, IntentFilter intentFilter) {
        ArrayList<ChooserTarget> targets = new ArrayList<>();

        for (/* Iterate over your collection */) {
            // Add the ChooserTargets to the list
            // ...
        }

        return targets;
    }
}
```

Each `ChooserTarget` had a name, icon, priority, and optionally a `Bundle`. You will probably want to include the Bundle to differentiate which target was chosen. The documentation reccommends that the key starts with your package name.


```java
// At class level
static final String KEY_ID = "com.you.app.SHARE_ID";

// Inside the for loop
Bundle extras = new Bundle();
extras.putString(KEY_ID, /* ID */);
```

Finally, create the `ChooserTarget`.

```java
targets.add(new ChooserTarget(
    /* Name of the target. Displayed in the menu */,
    /* Icon of the target. Also displayed */,
    0.5f, // Priority. If too many options are given, those with the lowest priority are removed first.
    componentName, // From the method parameters. Explained later
    extras // Those extras you defined in the previous step
));
```

### Manifest

All services must be declared in the app's `AndroidManifest.xml`. This is also where we let the system know that it call start our service to get the share targets.

```xml
<!-- Inside your <application> tag -->
<service
    android:name=".MyChooserService"
    android:enabled="true" 
    android:permission="android.permission.BIND_CHOOSER_TARGET_SERVICE">
    <intent-filter>
        <action android:name="android.service.chooser.ChooserTargetService"/>
    </intent-filter>
</service>
```

The `android.service.chooser.ChooserTargetService` intent is broadcast by the system whenever the system share dialog is created. To be able ro receive it, the Service must have the `android.permission.BIND_CHOOSER_TARGET_SERVICE` permission. 

## Receiving the Intent

### Manifest

Now the system knows it can start your service to get a list of targets, but it doesn't know where to send the share intent to. To do this, add an `intent-filter` to receive the intent. 

```xml
<!-- Inside your <application> tag -->
<activity
    android:name=".MyActivity"
    android:label="@string/title_activity_my"
    android:theme="@style/AppTheme">

    <intent-filter android:label="@string/share_title">
        <action android:name="android.intent.action.SEND"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <data android:mimeType="text/plain"/>
    </intent-filter>

    <!-- ... -->
    
</activity>
```

This will make it show up inside the normal share list, but still not in the Direct Share list. Add a `meta-data` tag to the Activity, pointing back to the ChooserTargetService we created.

```xml
<!-- Inside the <activity> -->
    <meta-data
        android:name="android.service.chooser.chooser_target_service"
        android:value=".MyChooserService"/>
```

This tag tells the system that it can get ChooserTargets by starting the MyChooserService service, and that it should point those ChooserTargets back to this Activity. The Activity's name is the one given in `onGetChooserTargets`' `componentName` parameter. Of course, you can set the ChooserTarget's component to anything you like, not just a single Activity.

### Java

Finally, handle the intent. In `MyActivity`'s `onCreate`, get the intent. If the user selected from the DirectShare panel, then the intent will contain the extras you defined in `onGetChooserTargets`.

```java
// MyActivity.java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Intent i = getIntent();
    if (i.getExtras() == null) {
        Log.d(TAG, "No extras found");
        finish();
    }

    if (i.hasExtra(MyChooserService.KEY_ID)) {
        // Get the ID, and do something useful with it!
    } else {
        // The user still shared to our app, but not using Direct Share
    }
}
```

And that's it! You app now has Direct Share capability, providing a smoother service to your users. If you found any problems in this example, please let me know so I can fix them. If you want to see Direct Share being used in an app, then have a look at the [source code for Mars](https://github.com/s-thom/MarsAndroid).
