---
layout: post
title: "Guide for Packages in NikGapps.config"
categories: misc
author: Kingshuk Das, Nikhil Menghani
---


## Nikgapps AppSets and Packages information

| Packages  | Description |
| ------------- | ------------- |
| `Core`  | Core packages, required to run the playstore  |
| `>>ExtraFiles=1`  | Package for additional files required to make gapps work  |
| `>>GooglePlayStore=1`  | Google Play Store, also known as Phonesky  |
| `>>GoogleServicesFramework=1`  | The Services Framework, in particular, is used to manage and update the various apps made by Google, as well as any application or game that is downloaded from the Google Play Store  |
| `>>GoogleContactsSyncAdapter=1`  | This package is used to sync the contacts associated to your google account   |
| `>>GoogleCalendarSyncAdapter=1`  | This package is used to sync the calendar events associated to your google account  |
| `>>GmsCore=1`  | Google Play Services - heart of google apps  |
| `DigitalWellbeing=1`  | Digital Wellbeing is Android's Digital Wellbeing tools give you a daily view of how often you check your phone and how frequently you use different apps  |
| `GoogleMessages=1`  | Package for Google Messages app  |
| `GoogleDialer=1`  | Package for Google Dialer app  |
| `GoogleContacts=1`  | Package for google contacts app  |
| `CarrierServices=1`  | Package for Message Carrier Service, also for RCS  |
| `GoogleClock=1`  | Package for Google Calendar app  |
| `SetupWizard=1`  | AppSet that controls Google Setup Wizard components  |
| `>>SetupWizard=1`  | Package for Google Setup Wizard  |
| `>>GoogleRestore=1`  | Google Restore lets you restore the backup data  |
| `>>GoogleOneTimeInitializer=1` | Lets you choose which apps to install during restore process while you're going through initial setup  |
| `>>AndroidMigratePrebuilt=1` | Pixel version of Google Restore |
| `GoogleCalculator=1` | Package for Google Calculator app |
| `GoogleDrive=1` | Package for Google Drive app |
| `GoogleMaps=1` | Package for Google Maps app |
| `GoogleLocationHistory=1` | Package for Maps location history service |
| `Gmail=1` | Package for Gmail app |
| `GooglePhotos=1` | Package for Google Photos app |
| `DeviceHealthServices=1` | Package for Device Battery Health Services app |
| `Flipendo=1` | Package for extreme battery saver service |
| `Velvet=1`  | Package for main google + assistant app |
| `GBoard=1` | Package for Google KeyBoard app |
| `PixelLauncher=1` | AppSet that controls Pixel Launcher components  |
| `>>PixelLauncher=1` | Package for Pixel Launcher  |
| `>>DevicePersonalizationServices=1` | Device Personalization Services is the method through which Google delivers and updates features like Now Playing (on Pixel), Live Caption, and smart actions in notifications to Android devices |
| `>>QuickAccessWallet=1` | Quick Access Wallet is for enabling access to wallets on Lock Screen |
| `>>GoogleWallpaper=1` | Package for Google based Wallpaper app |
| `GoogleFiles=1` | AppSet that controls Google Files components |
| `>>GoogleFiles=1` | Package for Google Files Manager |  
| `>>StorageManager=1` | StorageManager is junk cleaner in settings | 
| `>>DocumentsUIGoogle=1` | "DocumentsUIGoogle" is the file manager when you want to import file to an app e.g. select a file in chrome to upload |
| `GoogleRecorder=1` | Package for Google Recorder app |    
| `GoogleCalendar=1` | Package for Google Calendar app |
| `MarkupGoogle=1`  | Photos Markup app used in google photos and also to edit the captured screenshots|
| `GoogleFeedback=1` | Package for Google Feedback app |
| `GooglePartnerSetup=1` | Google Partner Setup is an app that helps you run applications in conjunction with Google products - For example, you can use the calendar from your device with a ToDo app that you've just installed |  
| `GoogleSounds=1` | Replaces stock aosp sounds selector with google sounds |
| `AndroidDevicePolicy=1` | It is for Enterprises to manage the devices |
| `GoogleKeep=1` | Google Notebook app |
| `Books=1`  | Google based e-book app |
| `Assistant=1`  | Standalone Assistant app |
| `YouTubeMusic=1`  | Stock YouTube music app |
| `PlayGames=1`  | Google Play Games app |
| `GoogleTTS=1`  | Google Text-to-speech app, Used by google when used with voice assistant |
| `GoogleTalkback=1`  | Google Talkback for accessibility for blind persons |
| `DeviceSetup=1`  | It's for adding work account, it has noting to do with setupwizard |
| `AndroidAuto=1`  | Installs Android auto. Used during driving Car and provides smart assistant |
| `GoogleChrome=1`  | Appset that controls GoogleChrome components  |
| `>>GoogleChrome=1` | Google Chrome Browser |
| `>>WebViewGoogle=1` | Webview for opening links from within the app) |
| `>>TrichromeLibrary=1` | Chrome Library |
| `CoreGo=1` | Core packages, required to run the playstore on NikGapps Go builds, do not use this in conjunction with Core Package |
| `GoogleGo=1`  | Go version of Google App |
| `AssistantGo=1`  | Go version of Assistant app |
| `MapsGo=1`  | Go version of Google Maps app |
| `NavigationGo=1`  | Go version of Google Navigation app |
| `GalleryGo=1`  | Go version of Google Gallery app |
| `GmailGo=1`  | Go version of Gmail app |
| `AdAway=1`  | Used to block ads via editing hosts file. Needs root or can be used with vpn method |
| `PixelLiveWallpapers=1`  | Pixel Live Wallpapers |
| `PixelSetupWizard=1`  | Pixel Setup Wizard addon with all that you need to have pixel setup wizard working |
| `GoogleFi=1`  | Google Fi app |
| `GoogleDuo=1` | Google Video Calling app |
| `GoogleDocs=1`  | Google Documents app |
| `GoogleSlides=1`  | Google Slides app |
| `GoogleSheets=1`  | Google Excel Sheets app |
| `YouTube=1` | Stock YouTube app |