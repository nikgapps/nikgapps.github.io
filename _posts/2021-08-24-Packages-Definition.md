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
      <td><code class="language-plaintext highlighter-rouge">Core</code></td>
      <td>Core packages, required to run the playstore</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;ExtraFiles=1</code></td>
      <td>Package for additional files required to make gapps work</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;GooglePlayStore=1</code></td>
      <td>Google Play Store, also known as Phonesky</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;GoogleServicesFramework=1</code></td>
      <td>The Services Framework, in particular, is used to manage and update the various apps made by Google, as well as any application or game that is downloaded from the Google Play Store</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;GoogleContactsSyncAdapter=1</code></td>
      <td>This package is used to sync the contacts associated to your google account</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;GoogleCalendarSyncAdapter=1</code></td>
      <td>This package is used to sync the calendar events associated to your google account</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;GmsCore=1</code></td>
      <td>Google Play Services - heart of google apps</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">DigitalWellbeing=1</code></td>
      <td>Digital Wellbeing is Android’s Digital Wellbeing tools give you a daily view of how often you check your phone and how frequently you use different apps</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleMessages=1</code></td>
      <td>Package for Google Messages app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleDialer=1</code></td>
      <td>Package for Google Dialer app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleContacts=1</code></td>
      <td>Package for google contacts app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">CarrierServices=1</code></td>
      <td>Package for Message Carrier Service, also for RCS</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleClock=1</code></td>
      <td>Package for Google Calendar app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">SetupWizard=1</code></td>
      <td>AppSet that controls Google Setup Wizard components</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;SetupWizard=1</code></td>
      <td>Package for Google Setup Wizard</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;GoogleRestore=1</code></td>
      <td>Google Restore lets you restore the backup data</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;GoogleOneTimeInitializer=1</code></td>
      <td>Lets you choose which apps to install during restore process while you’re going through initial setup</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;AndroidMigratePrebuilt=1</code></td>
      <td>Pixel version of Google Restore</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleCalculator=1</code></td>
      <td>Package for Google Calculator app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleDrive=1</code></td>
      <td>Package for Google Drive app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleMaps=1</code></td>
      <td>Package for Google Maps app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleLocationHistory=1</code></td>
      <td>Package for Maps location history service</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">Gmail=1</code></td>
      <td>Package for Gmail app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GooglePhotos=1</code></td>
      <td>Package for Google Photos app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">DeviceHealthServices=1</code></td>
      <td>Package for Device Battery Health Services app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">Flipendo=1</code></td>
      <td>Package for extreme battery saver service</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">Velvet=1</code></td>
      <td>Package for main google + assistant app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GBoard=1</code></td>
      <td>Package for Google KeyBoard app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">PixelLauncher=1</code></td>
      <td>AppSet that controls Pixel Launcher components</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;PixelLauncher=1</code></td>
      <td>Package for Pixel Launcher</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;DevicePersonalizationServices=1</code></td>
      <td>Device Personalization Services is the method through which Google delivers and updates features like Now Playing (on Pixel), Live Caption, and smart actions in notifications to Android devices</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;QuickAccessWallet=1</code></td>
      <td>Quick Access Wallet is for enabling access to wallets on Lock Screen</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;GoogleWallpaper=1</code></td>
      <td>Package for Google based Wallpaper app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleFiles=1</code></td>
      <td>AppSet that controls Google Files components</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;GoogleFiles=1</code></td>
      <td>Package for Google Files Manager</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;StorageManager=1</code></td>
      <td>StorageManager is junk cleaner in settings</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;DocumentsUIGoogle=1</code></td>
      <td>“DocumentsUIGoogle” is the file manager when you want to import file to an app e.g. select a file in chrome to upload</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleRecorder=1</code></td>
      <td>Package for Google Recorder app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleCalendar=1</code></td>
      <td>Package for Google Calendar app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">MarkupGoogle=1</code></td>
      <td>Photos Markup app used in google photos and also to edit the captured screenshots</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleFeedback=1</code></td>
      <td>Package for Google Feedback app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GooglePartnerSetup=1</code></td>
      <td>Google Partner Setup is an app that helps you run applications in conjunction with Google products - For example, you can use the calendar from your device with a ToDo app that you’ve just installed</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleSounds=1</code></td>
      <td>Replaces stock aosp sounds selector with google sounds</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">AndroidDevicePolicy=1</code></td>
      <td>It is for Enterprises to manage the devices</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleKeep=1</code></td>
      <td>Google Notebook app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">Books=1</code></td>
      <td>Google based e-book app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">Assistant=1</code></td>
      <td>Standalone Assistant app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">YouTubeMusic=1</code></td>
      <td>Stock YouTube music app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">PlayGames=1</code></td>
      <td>Google Play Games app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleTTS=1</code></td>
      <td>Google Text-to-speech app, Used by google when used with voice assistant</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleTalkback=1</code></td>
      <td>Google Talkback for accessibility for blind persons</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">DeviceSetup=1</code></td>
      <td>It’s for adding work account, it has noting to do with setupwizard</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">AndroidAuto=1</code></td>
      <td>Installs Android auto. Used during driving Car and provides smart assistant</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleChrome=1</code></td>
      <td>Appset that controls GoogleChrome components</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;GoogleChrome=1</code></td>
      <td>Google Chrome Browser</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;WebViewGoogle=1</code></td>
      <td>Webview for opening links from within the app)</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">&gt;&gt;TrichromeLibrary=1</code></td>
      <td>Chrome Library</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">CoreGo=1</code></td>
      <td>Core packages, required to run the playstore on NikGapps Go builds, do not use this in conjunction with Core Package</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleGo=1</code></td>
      <td>Go version of Google App</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">AssistantGo=1</code></td>
      <td>Go version of Assistant app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">MapsGo=1</code></td>
      <td>Go version of Google Maps app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">NavigationGo=1</code></td>
      <td>Go version of Google Navigation app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GalleryGo=1</code></td>
      <td>Go version of Google Gallery app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GmailGo=1</code></td>
      <td>Go version of Gmail app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">AdAway=1</code></td>
      <td>Used to block ads via editing hosts file. Needs root or can be used with vpn method</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">PixelLiveWallpapers=1</code></td>
      <td>Pixel Live Wallpapers</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">PixelSetupWizard=1</code></td>
      <td>Pixel Setup Wizard addon with all that you need to have pixel setup wizard working</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleFi=1</code></td>
      <td>Google Fi app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleDuo=1</code></td>
      <td>Google Video Calling app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleDocs=1</code></td>
      <td>Google Documents app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleSlides=1</code></td>
      <td>Google Slides app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">GoogleSheets=1</code></td>
      <td>Google Excel Sheets app</td>
    </tr>
    <tr>
      <td><code class="language-plaintext highlighter-rouge">YouTube=1</code></td>
      <td>Stock YouTube app</td>
    </tr>
  </tbody>
</table>