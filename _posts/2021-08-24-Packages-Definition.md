---
layout: post
title: "Guide for Packages in NikGapps.config"
categories: misc
author: Kingshuk Das, Nikhil Menghani
---


## Nikgapps AppSets and Packages information

<table class="ui celled table">
  <thead>
    <tr style="border: black;border-block-color: inherit;border-block-width: inherit;">
      <th>Packages</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Core</td>
      <td>Core packages, required to run the playstore</td>
    </tr>
    <tr>
      <td>&gt;&gt;ExtraFiles=1</td>
      <td>Package for additional files required to make gapps work</td>
    </tr>
    <tr>
      <td>&gt;&gt;GooglePlayStore=1</td>
      <td>Google Play Store, also known as Phonesky</td>
    </tr>
    <tr>
      <td>&gt;&gt;GoogleServicesFramework=1</td>
      <td>The Services Framework, in particular, is used to manage and update the various apps made by Google, as well as any application or game that is downloaded from the Google Play Store</td>
    </tr>
    <tr>
      <td>&gt;&gt;GoogleContactsSyncAdapter=1</td>
      <td>This package is used to sync the contacts associated to your google account</td>
    </tr>
    <tr>
      <td>&gt;&gt;GoogleCalendarSyncAdapter=1</td>
      <td>This package is used to sync the calendar events associated to your google account</td>
    </tr>
    <tr>
      <td>&gt;&gt;GmsCore=1</td>
      <td>Google Play Services - heart of google apps</td>
    </tr>
    <tr>
      <td>DigitalWellbeing=1</td>
      <td>Digital Wellbeing is Android’s Digital Wellbeing tools give you a daily view of how often you check your phone and how frequently you use different apps</td>
    </tr>
    <tr>
      <td>GoogleMessages=1</td>
      <td>Package for Google Messages app</td>
    </tr>
    <tr>
      <td>GoogleDialer=1</td>
      <td>Package for Google Dialer app</td>
    </tr>
    <tr>
      <td>GoogleContacts=1</td>
      <td>Package for google contacts app</td>
    </tr>
    <tr>
      <td>CarrierServices=1</td>
      <td>Package for Message Carrier Service, also for RCS</td>
    </tr>
    <tr>
      <td>GoogleClock=1</td>
      <td>Package for Google Calendar app</td>
    </tr>
    <tr>
      <td>SetupWizard=1</td>
      <td>AppSet that controls Google Setup Wizard components</td>
    </tr>
    <tr>
      <td>&gt;&gt;SetupWizard=1</td>
      <td>Package for Google Setup Wizard</td>
    </tr>
    <tr>
      <td>&gt;&gt;GoogleRestore=1</td>
      <td>Google Restore lets you restore the backup data</td>
    </tr>
    <tr>
      <td>&gt;&gt;GoogleOneTimeInitializer=1</td>
      <td>Lets you choose which apps to install during restore process while you’re going through initial setup</td>
    </tr>
    <tr>
      <td>&gt;&gt;AndroidMigratePrebuilt=1</td>
      <td>Pixel version of Google Restore</td>
    </tr>
    <tr>
      <td>GoogleCalculator=1</td>
      <td>Package for Google Calculator app</td>
    </tr>
    <tr>
      <td>GoogleDrive=1</td>
      <td>Package for Google Drive app</td>
    </tr>
    <tr>
      <td>GoogleMaps=1</td>
      <td>Package for Google Maps app</td>
    </tr>
    <tr>
      <td>GoogleLocationHistory=1</td>
      <td>Package for Maps location history service</td>
    </tr>
    <tr>
      <td>Gmail=1</td>
      <td>Package for Gmail app</td>
    </tr>
    <tr>
      <td>GooglePhotos=1</td>
      <td>Package for Google Photos app</td>
    </tr>
    <tr>
      <td>DeviceHealthServices=1</td>
      <td>Package for Device Battery Health Services app</td>
    </tr>
    <tr>
      <td>Flipendo=1</td>
      <td>Package for extreme battery saver service</td>
    </tr>
    <tr>
      <td>Velvet=1</td>
      <td>Package for main google + assistant app</td>
    </tr>
    <tr>
      <td>GBoard=1</td>
      <td>Package for Google KeyBoard app</td>
    </tr>
    <tr>
      <td>PixelLauncher=1</td>
      <td>AppSet that controls Pixel Launcher components</td>
    </tr>
    <tr>
      <td>&gt;&gt;PixelLauncher=1</td>
      <td>Package for Pixel Launcher</td>
    </tr>
    <tr>
      <td>&gt;&gt;DevicePersonalizationServices=1</td>
      <td>Device Personalization Services is the method through which Google delivers and updates features like Now Playing (on Pixel), Live Caption, and smart actions in notifications to Android devices</td>
    </tr>
    <tr>
      <td>&gt;&gt;QuickAccessWallet=1</td>
      <td>Quick Access Wallet is for enabling access to wallets on Lock Screen</td>
    </tr>
    <tr>
      <td>&gt;&gt;GoogleWallpaper=1</td>
      <td>Package for Google based Wallpaper app</td>
    </tr>
    <tr>
      <td>GoogleFiles=1</td>
      <td>AppSet that controls Google Files components</td>
    </tr>
    <tr>
      <td>&gt;&gt;GoogleFiles=1</td>
      <td>Package for Google Files Manager</td>
    </tr>
    <tr>
      <td>&gt;&gt;StorageManager=1</td>
      <td>StorageManager is junk cleaner in settings</td>
    </tr>
    <tr>
      <td>&gt;&gt;DocumentsUIGoogle=1</td>
      <td>“DocumentsUIGoogle” is the file manager when you want to import file to an app e.g. select a file in chrome to upload</td>
    </tr>
    <tr>
      <td>GoogleRecorder=1</td>
      <td>Package for Google Recorder app</td>
    </tr>
    <tr>
      <td>GoogleCalendar=1</td>
      <td>Package for Google Calendar app</td>
    </tr>
    <tr>
      <td>MarkupGoogle=1</td>
      <td>Photos Markup app used in google photos and also to edit the captured screenshots</td>
    </tr>
    <tr>
      <td>GoogleFeedback=1</td>
      <td>Package for Google Feedback app</td>
    </tr>
    <tr>
      <td>GooglePartnerSetup=1</td>
      <td>Google Partner Setup is an app that helps you run applications in conjunction with Google products - For example, you can use the calendar from your device with a ToDo app that you’ve just installed</td>
    </tr>
    <tr>
      <td>GoogleSounds=1</td>
      <td>Replaces stock aosp sounds selector with google sounds</td>
    </tr>
    <tr>
      <td>AndroidDevicePolicy=1</td>
      <td>It is for Enterprises to manage the devices</td>
    </tr>
    <tr>
      <td>GoogleKeep=1</td>
      <td>Google Notebook app</td>
    </tr>
    <tr>
      <td>Books=1</td>
      <td>Google based e-book app</td>
    </tr>
    <tr>
      <td>Assistant=1</td>
      <td>Standalone Assistant app</td>
    </tr>
    <tr>
      <td>YouTubeMusic=1</td>
      <td>Stock YouTube music app</td>
    </tr>
    <tr>
      <td>PlayGames=1</td>
      <td>Google Play Games app</td>
    </tr>
    <tr>
      <td>GoogleTTS=1</td>
      <td>Google Text-to-speech app, Used by google when used with voice assistant</td>
    </tr>
    <tr>
      <td>GoogleTalkback=1</td>
      <td>Google Talkback for accessibility for blind persons</td>
    </tr>
    <tr>
      <td>DeviceSetup=1</td>
      <td>It’s for adding work account, it has noting to do with setupwizard</td>
    </tr>
    <tr>
      <td>AndroidAuto=1</td>
      <td>Installs Android auto. Used during driving Car and provides smart assistant</td>
    </tr>
    <tr>
      <td>GoogleChrome=1</td>
      <td>Appset that controls GoogleChrome components</td>
    </tr>
    <tr>
      <td>&gt;&gt;GoogleChrome=1</td>
      <td>Google Chrome Browser</td>
    </tr>
    <tr>
      <td>&gt;&gt;WebViewGoogle=1</td>
      <td>Webview for opening links from within the app)</td>
    </tr>
    <tr>
      <td>&gt;&gt;TrichromeLibrary=1</td>
      <td>Chrome Library</td>
    </tr>
    <tr>
      <td>CoreGo=1</td>
      <td>Core packages, required to run the playstore on NikGapps Go builds, do not use this in conjunction with Core Package</td>
    </tr>
    <tr>
      <td>GoogleGo=1</td>
      <td>Go version of Google App</td>
    </tr>
    <tr>
      <td>AssistantGo=1</td>
      <td>Go version of Assistant app</td>
    </tr>
    <tr>
      <td>MapsGo=1</td>
      <td>Go version of Google Maps app</td>
    </tr>
    <tr>
      <td>NavigationGo=1</td>
      <td>Go version of Google Navigation app</td>
    </tr>
    <tr>
      <td>GalleryGo=1</td>
      <td>Go version of Google Gallery app</td>
    </tr>
    <tr>
      <td>GmailGo=1</td>
      <td>Go version of Gmail app</td>
    </tr>
    <tr>
      <td>AdAway=1</td>
      <td>Used to block ads via editing hosts file. Needs root or can be used with vpn method</td>
    </tr>
    <tr>
      <td>PixelLiveWallpapers=1</td>
      <td>Pixel Live Wallpapers</td>
    </tr>
    <tr>
      <td>PixelSetupWizard=1</td>
      <td>Pixel Setup Wizard addon with all that you need to have pixel setup wizard working</td>
    </tr>
    <tr>
      <td>GoogleFi=1</td>
      <td>Google Fi app</td>
    </tr>
    <tr>
      <td>GoogleDuo=1</td>
      <td>Google Video Calling app</td>
    </tr>
    <tr>
      <td>GoogleDocs=1</td>
      <td>Google Documents app</td>
    </tr>
    <tr>
      <td>GoogleSlides=1</td>
      <td>Google Slides app</td>
    </tr>
    <tr>
      <td>GoogleSheets=1</td>
      <td>Google Excel Sheets app</td>
    </tr>
    <tr>
      <td>YouTube=1</td>
      <td>Stock YouTube app</td>
    </tr>
  </tbody>
</table>